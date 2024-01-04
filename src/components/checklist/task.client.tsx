'use client'
import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { useChecklistState } from './state';
import { DraggableTaskProps } from './types';
import { ContextMenu } from '../ui/context-menu';
import { ContextMenuTrigger } from '@radix-ui/react-context-menu';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';

function Task(props: DraggableTaskProps): JSX.Element {
  const {
    onClickCheckbox,
    onDismissEditTask,
    onSubmitEditTask,

    checklist,
    currentTaskId,
  } = useChecklistState();

  const { title, completed } = useMemo(
    () => checklist.tasks[props.id],
    [props.id, checklist.tasks]
  );

  // if (currentTaskId === props.id) {
  //   return (
  //     <TaskForm
  //       initialTaskName={title}
  //       dismiss={onDismissEditTask}
  //       onSubmitForm={(taskName) =>
  //         onSubmitEditTask(props.id, { title: taskName })
  //       }
  //     />
  //   );
  // }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          ref={props.draggableProvided?.innerRef}
          {...props.draggableProvided?.draggableProps}
          {...props.draggableProvided?.dragHandleProps}
          className={cn(
            props.snapshot?.isDragging && '',
            // styles.container
            'border-border border-2 rounded-lg p-2.5'
          )}
          data-testid="checklist-task"
        >
          <div className='flex items-center justify-start gap-2'>
            <Checkbox
              data-testid="checklist-checkbox"
              className="rounded-full"
              checked={completed}
              onClick={() => onClickCheckbox(props.id)}
            />
            <span className={cn(completed && 'line-through')}>
              {title}
            </span>
          </div>
        </div>
      </ContextMenuTrigger>

      {/* <TaskContextMenu id={props.id} completed={completed} /> */}
    </ContextMenu>
  );
}

export default Task;
