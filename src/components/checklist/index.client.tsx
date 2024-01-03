'use client';

const DragDropContext = dynamic(() => import('react-beautiful-dnd').then(resp => ({ default: resp.DragDropContext })))

import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useChecklistState, withChecklistState } from './state';
import dynamic from 'next/dynamic';

export function Checklist(): JSX.Element {
  const { onDeleteCompletedTasks, onDragEnd, checklist, currentTaskId } =
    useChecklistState();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card>
        <div
          className='flex flex-row items-center justify-between px-4 gap-1 mt-2'
        >
          <h5 className="flex-1 text-lg">
            {checklist.title}
          </h5>

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

        <Separator className='my-2' />

        {/* <StrictModeDroppable
          key={checklist.id}
          droppableId={checklist.id}
          direction="vertical"
        >
          {(droppableProvided) => (
            <div>
              <Flex
                direction="column"
                gap="2"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <DraggableTasks />
                {droppableProvided.placeholder}
                {!currentTaskId && (
                  <Box mt="2">
                    <AddTask />
                  </Box>
                )}
              </Flex>
            </div>
          )}
        </StrictModeDroppable> */}
      </Card>
    </DragDropContext>
  );
}

export default withChecklistState(Checklist);
