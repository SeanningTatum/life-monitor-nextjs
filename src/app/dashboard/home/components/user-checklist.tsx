'use client';

import { Suspense, lazy } from "react";
import useChecklist from "@/app/hooks/useChecklist";
import Checklist from "@/components/checklist/index.client";

function UserChecklist() {
  const [checklist, actions] = useChecklist({
    id: 'checklist',
    taskOrder: [],
    tasks: {},
    title: 'Work Checklist'
  });

  return (
    <Suspense fallback={<></>}>
      <Checklist
        checklist={checklist}
        onAddTask={() => { }}
        onClickCheckbox={() => { }}
        onDeleteCompletedTasks={() => { }}
        onDeleteTask={() => { }}
        onEditTask={() => { }}
        onTaskMoved={() => { }}
      />
    </Suspense>
  )
}

export default UserChecklist