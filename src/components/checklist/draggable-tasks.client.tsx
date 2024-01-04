'use client';

import { Draggable } from 'react-beautiful-dnd';

import { useChecklistState } from './state';
import Task from './task.client';


function DraggableTasks(): JSX.Element[] {
  const { checklist } = useChecklistState();

  return checklist.taskOrder.map((taskId, index) => (
    <Draggable key={taskId} draggableId={taskId} index={index}>
      {(provided, snapshot) => (
        <Task id={taskId} snapshot={snapshot} draggableProvided={provided} />
      )}
    </Draggable>
  ));
}

export default DraggableTasks;
