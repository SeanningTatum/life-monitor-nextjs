'use client';

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import useChecklist from "@/hooks/use-checklist";
import type { Checklist, Task } from "@prisma/client";

const Checklist = dynamic(() => import('@/components/checklist/index.client'), {
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
      onAddTask={(task) => actions.addTask({ id: Date.now().toString(), title: task, completed: false })}
      onClickCheckbox={actions.toggleTaskCompletion}
      onDeleteCompletedTasks={() => actions.deleteCompletedTasks()}
      onDeleteTask={actions.deleteTask}
      onEditTask={actions.updateTask}
      onTaskMoved={actions.moveTask}
    />
  )
}

export default UserChecklist