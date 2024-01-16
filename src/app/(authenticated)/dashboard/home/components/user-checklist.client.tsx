"use client";

import dynamic from "next/dynamic";
import { toast } from "sonner";

import type { ChecklistWithTasks } from "../types";

import { Skeleton } from "@/components/ui/skeleton";
import useChecklist from "@/hooks/use-checklist";
import { trpc } from "@/lib/trpc";
import { Task, moveTask } from "@/lib/checklist";

const Checklist = dynamic(() => import("@/components/checklist/index.client"), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
});

interface Props {
  checklist: ChecklistWithTasks;
}

function UserChecklist(props: Props): JSX.Element {
  const [checklist, actions, setChecklist] = useChecklist({
    ...props.checklist,
    title: props.checklist.name,
    tasks: Object.fromEntries(
      props.checklist.tasks.map((task) => [task.id, { ...task }])
    ),
  });

  const patchTask = trpc.checklist.patchTask.useMutation({
    onSuccess: (data) => {
      toast(`Updated ${data.title}!`);
    },
  });
  const addTaskToChecklist = trpc.checklist.addTaskToChecklist.useMutation();
  const deleteCompletedTasks =
    trpc.checklist.deleteCompletedTasks.useMutation();
  const deleteTaskById = trpc.checklist.deleteTaskById.useMutation();
  const patchChecklist = trpc.checklist.patchChecklist.useMutation();

  function completeTask(taskId: string): void {
    const snapshot = { ...checklist };
    actions.toggleTaskCompletion(taskId);

    try {
      patchTask.mutate({
        id: taskId,
        data: {
          completed: !checklist.tasks[taskId].completed,
        },
      });
    } catch (error) {
      console.error(error);
      setChecklist(snapshot);
    }
  }

  function editTask(taskId: string, task: Partial<Task>): void {
    const snapshot = { ...checklist };
    actions.updateTask(taskId, task);

    try {
      patchTask.mutate({
        id: taskId,
        data: {
          ...task,
        },
      });
    } catch (error) {
      console.error(error);
      setChecklist(snapshot);
    }
  }

  async function onAddTask(title: string): Promise<void> {
    const mockId = Date.now().toString();
    actions.addTask({ id: mockId, title, completed: false, optimistic: true });
    const snapshot = { ...checklist };

    try {
      const newTask = await addTaskToChecklist.mutateAsync({
        checklistId: props.checklist.id,
        data: { title },
      });
      actions.updateTask(mockId, { id: newTask.id, title, optimistic: false });
    } catch (error) {
      console.error(error);
      setChecklist(snapshot);
    }
  }

  async function onDeleteCompletedTasks(): Promise<void> {
    const snapshot = { ...checklist };
    actions.deleteCompletedTasks();
    try {
      await deleteCompletedTasks.mutateAsync({
        checklistId: props.checklist.id,
      });
    } catch (error) {
      console.error(error);
      setChecklist(snapshot);
    }
  }

  async function onDeleteTask(taskId: string): Promise<void> {
    const snapshot = { ...checklist };
    actions.deleteTask(taskId);

    try {
      await deleteTaskById.mutateAsync({
        taskId,
        checklistId: props.checklist.id,
      });
    } catch (error) {
      console.error(error);
      setChecklist(snapshot);
    }
  }

  async function onTaskMoved(from: number, to: number): Promise<void> {
    setChecklist((prev) => {
      const newChecklist = moveTask(from, to, prev);

      patchChecklist
        .mutateAsync({
          id: props.checklist.id,
          data: {
            taskOrder: newChecklist.taskOrder,
          },
        })
        .catch(() => setChecklist(prev));

      return newChecklist;
    });
  }

  return (
    <Checklist
      checklist={checklist}
      onAddTask={onAddTask}
      onClickCheckbox={completeTask}
      onDeleteCompletedTasks={onDeleteCompletedTasks}
      onDeleteTask={onDeleteTask}
      onEditTask={editTask}
      onTaskMoved={onTaskMoved}
    />
  );
}

export default UserChecklist;
