'use client';

import { Skeleton } from "@/components/ui/skeleton";
import useChecklist from "@/hooks/use-checklist";
import dynamic from "next/dynamic";

const Checklist = dynamic(() => import('@/components/checklist/index.client'), {
  loading: () => <Skeleton className="h-[200px] w-full" />
});

function UserChecklist() {
  const [checklist, actions] = useChecklist({
    id: 'checklist',
    taskOrder: ['task-1', 'task-2', 'task-3'],
    tasks: {
      'task-1': {
        id: 'task-1',
        title: 'Super Boss',
        completed: false,
      },
      'task-2': {
        id: 'task-2',
        title: 'Super Boss 2',
        completed: false,
      },
      'task-3': {
        id: 'task-3',
        title: 'Super Boss 3',
        completed: false,
      }
    },
    title: 'Work Checklist'
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