'use client';

import dynamic from "next/dynamic";
import { toast } from "sonner";

import type { ChecklistWithTasks } from "../types";

import { Skeleton } from "@/components/ui/skeleton";
import useChecklist from "@/hooks/use-checklist";
import { trpc } from "@/lib/trpc";
import { Task, moveTask } from "@/lib/checklist";

const Checklist = dynamic(() => import('@/components/checklist/index.client'), {
  loading: () => <Skeleton className="h-[200px] w-full" />
});

interface Props {
  checklist: ChecklistWithTasks;
}

function UserChecklist(props: Props): JSX.Element {
  const [checklist, actions, setChecklist] = useChecklist({
    ...props.checklist,
    title: props.checklist.name,
    tasks: Object.fromEntries(
      props.checklist.tasks.map(task => [task.id, { ...task }])
    ),
  });

  const patchTask = trpc.checklist.patchTask.useMutation({
    onSuccess: (data) => {
      toast(`Updated ${data.title}!`);
    }
  });
  const addTaskToChecklist = trpc.checklist.addTaskToChecklist.useMutation();
  const deleteCompletedTasks = trpc.checklist.deleteCompletedTasks.useMutation({
    onSuccess: () => {
      toast('Removed completed tasks!');
    }
  });
  const deleteTaskById = trpc.checklist.deleteTaskById.useMutation();
  const patchChecklist = trpc.checklist.patchChecklist.useMutation();

  function completeTask(taskId: string): void {
    patchTask.mutate({
      id: taskId,
      data: {
        completed: !checklist.tasks[taskId].completed,
      }
    });

    actions.toggleTaskCompletion(taskId);
  }

  function editTask(taskId: string, task: Partial<Task>): void {
    patchTask.mutate({
      id: taskId,
      data: {
        ...task,
      }
    })

    actions.updateTask(taskId, task);
  }

  async function onAddTask(title: string): Promise<void> {
    const newTask = await addTaskToChecklist.mutateAsync({ checklistId: props.checklist.id, data: { title } })

    actions.addTask(newTask)
  }

  async function onDeleteCompletedTasks(): Promise<void> {
    await deleteCompletedTasks.mutateAsync({ checklistId: props.checklist.id });
    actions.deleteCompletedTasks();
  }

  async function onDeleteTask(taskId: string): Promise<void> {
    await deleteTaskById.mutateAsync({ taskId, checklistId: props.checklist.id })
    actions.deleteTask(taskId)
  }

  async function onTaskMoved(from: number, to: number): Promise<void> {
    setChecklist(prev => {
      const newChecklist = moveTask(from, to, prev);

      patchChecklist.mutate({
        id: props.checklist.id,
        data: {
          taskOrder: newChecklist.taskOrder,
        }
      })

      return newChecklist;

    })
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
  )
}

export default UserChecklist
