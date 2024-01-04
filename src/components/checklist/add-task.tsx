'use client'

import { PlusIcon } from '@radix-ui/react-icons';

import { useChecklistState } from './state';
import { Button } from '../ui/button';

function AddTask(): JSX.Element {
  const { onClickAddTask, isAdding, onDismissAddTask, onSubmitNewTask } =
    useChecklistState();

  // if (isAdding) {
  //   return (
  //     <TaskForm dismiss={onDismissAddTask} onSubmitForm={onSubmitNewTask} />
  //   );
  // }

  return (
    <Button
      data-testid="add-task-button"
      onClick={onClickAddTask}
      variant="ghost"
      className='mb-2 mx-3 flex w-full justify-start gap-2'
    >
      <PlusIcon className="" fontWeight={800} />
      <span className="font-medium text-sm">
        Add Task
      </span>
    </Button>
  );
}

export default AddTask;
