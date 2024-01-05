'use client';

import { DragDropContext } from 'react-beautiful-dnd';

import { Card, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import DraggableTasks from './components/draggable-tasks';
import { Separator } from '../ui/separator';

import AddTask from './components/add-task';
import { useChecklistState, withChecklistState } from './state';
import { StrictModeDroppable } from './components/strict-mode-droppable';

function Checklist(): JSX.Element {
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

        <Separator className="my-2" />

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
                <div className='mt-1'>
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
