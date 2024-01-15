'use client';

import { Draggable } from 'react-beautiful-dnd';

import { useChecklistState } from '../state';

import Task from './task';


function DraggableTasks(): JSX.Element[] {
  const { checklist } = useChecklistState();


  return checklist.taskOrder.map((taskId, index) => {
    const isOptimistic = checklist.tasks[taskId]?.optimistic;

    return (
      <Draggable key={taskId} draggableId={taskId} index={index} isDragDisabled={isOptimistic}>
        {(provided, snapshot) => (
          <Task id={taskId} snapshot={snapshot} draggableProvided={provided} />
        )}
      </Draggable>
    )
  });
}

export default DraggableTasks;
