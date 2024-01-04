import { useCallback, useState } from 'react';
import * as cl from '@/lib/checklist/index';

interface UseChecklistActions {
  addTask: (...args: Parameters<typeof cl.addTask>) => void;
  deleteTask: (...args: Parameters<typeof cl.deleteTask>) => void;
  deleteCompletedTasks: (
    ...args: Parameters<typeof cl.deleteCompletedTasks>
  ) => void;
  moveTask: (...args: Parameters<typeof cl.moveTask>) => void;
  toggleTaskCompletion: (
    ...args: Parameters<typeof cl.toggleTaskCompletion>
  ) => void;
  updateTask: (...args: Parameters<typeof cl.updateTask>) => void;
}

function useChecklist(
  initialState: cl.Checklist
): [cl.Checklist, UseChecklistActions] {
  const [checklist, setChecklist] = useState<cl.Checklist>(initialState);

  const addTask = useCallback(
    (...args: Parameters<typeof cl.addTask>) =>
      setChecklist(cl.addTask(...args)),
    []
  );
  const deleteCompletedTasks = useCallback(
    (...args: Parameters<typeof cl.deleteCompletedTasks>) =>
      setChecklist(cl.deleteCompletedTasks(...args)),
    []
  );
  const deleteTask = useCallback(
    (...args: Parameters<typeof cl.deleteTask>) =>
      setChecklist(cl.deleteTask(...args)),
    []
  );
  const moveTask = useCallback(
    (...args: Parameters<typeof cl.moveTask>) =>
      setChecklist(cl.moveTask(...args)),
    []
  );
  const updateTask = useCallback(
    (...args: Parameters<typeof cl.updateTask>) =>
      setChecklist(cl.updateTask(...args)),
    []
  );
  const toggleTaskCompletion = useCallback(
    (...args: Parameters<typeof cl.toggleTaskCompletion>) =>
      setChecklist(cl.toggleTaskCompletion(...args)),
    []
  );

  return [
    checklist,
    {
      addTask,
      deleteCompletedTasks,
      deleteTask,
      moveTask,
      toggleTaskCompletion,
      updateTask,
    },
  ];
}

export default useChecklist;
