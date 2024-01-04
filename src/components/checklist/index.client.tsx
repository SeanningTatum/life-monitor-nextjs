'use client';

import { DragDropContext } from 'react-beautiful-dnd';

import { Card, CardContent, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useChecklistState, withChecklistState } from './state';
import dynamic from 'next/dynamic';
import { StrictModeDroppable } from './strict-mode-droppable.client';
import DraggableTasks from './draggable-tasks.client';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import AddTask from './add-task';

export function Checklist(): JSX.Element {
  const { onDeleteCompletedTasks, onDragEnd, checklist, currentTaskId } =
    useChecklistState();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className="p-4">
        <div
          className='flex flex-row items-center justify-between'
        >
          <CardTitle className="flex-1 text-lg">
            {checklist.title}
          </CardTitle>

          <Button
            type="button"
            onClick={onDeleteCompletedTasks}
            data-testid="remove-done-button"
            variant="destructive"
            size="sm"
          >
            Remove Done
          </Button>
        </div>

        <Separator className={cn('my-2')} />

        <StrictModeDroppable
          key={checklist.id}
          droppableId={checklist.id}
          direction="vertical"
        >
          {(droppableProvided) => (
            <div
              className='flex flex-col gap-2'
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}

            >
              <DraggableTasks />
              {droppableProvided.placeholder}
              {!currentTaskId && (
                <div className='mt-2'>
                  <AddTask />
                </div>
              )}
            </div>
          )}
        </StrictModeDroppable>


      </Card>
    </DragDropContext>
  );
}

export default withChecklistState(Checklist);
