'use client';

import dynamic from "next/dynamic";
import { Checklist} from "@prisma/client";
import type { Task } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import useChecklist from "@/hooks/use-checklist";

const Checklist = dynamic(async () => await import('@/components/checklist/index.client'), {
  loading: () => <Skeleton className="h-[200px] w-full" />
});

interface Props {
  checklist: Checklist & {
    tasks: Task[];
  };
}

function UserChecklist(props: Props) {
  const [checklist, actions] = useChecklist({
    ...props.checklist,
    title: props.checklist.name,
    tasks: Object.fromEntries(
      props.checklist.tasks.map(task => [task.id, { ...task }])
    ),
  });

  return (
    <Checklist
      checklist={checklist}
      onAddTask={(task) => { actions.addTask({ id: Date.now().toString(), title: task, completed: false }); }}
      onClickCheckbox={actions.toggleTaskCompletion}
      onDeleteCompletedTasks={() => { actions.deleteCompletedTasks(); }}
      onDeleteTask={actions.deleteTask}
      onEditTask={actions.updateTask}
      onTaskMoved={actions.moveTask}
    />
  )
}

export default UserChecklist