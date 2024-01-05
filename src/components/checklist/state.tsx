'use client';

import React, { createContext, useContext, useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';

import { type ChecklistProps, type ChecklistState } from './types';

import { type Task } from '@/lib/checklist/types';


const ChecklistStateContext = createContext({} as ChecklistState);

const withChecklistState = (Component: React.FC) => (props: ChecklistProps) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentTaskId, setCurrentTaskId] = useState<string>();

  function onClickAddTask(): void {
    setIsAdding(true);
  }

  function onClickEditTask(taskId: string): void {
    setCurrentTaskId(taskId);
  }

  function onDismissAddTask(): void {
    setIsAdding(false);
  }

  function onDismissEditTask(): void {
    setCurrentTaskId(undefined);
  }

  function onDragEnd({ destination, source }: DropResult): void {
    // Dropped nowhere
    if (!destination) {
      return;
    }

    const from = source.index;
    const to = destination.index;

    props.onTaskMoved?.(from, to);
  }

  function onSubmitEditTask(id: string, task: Partial<Task>): void {
    setCurrentTaskId(undefined);
    props.onEditTask(id, task);
  }

  function onSubmitNewTask(taskName: string): void {
    setIsAdding(false);
    props.onAddTask(taskName);
  }

  const generatedState: ChecklistState = {
    ...props,
    onClickAddTask,
    onDismissAddTask,
    onClickEditTask,
    onDismissEditTask,
    onDragEnd,
    onSubmitNewTask,
    onSubmitEditTask,

    isAdding,
    currentTaskId,
  };

  return (
    <ChecklistStateContext.Provider value={generatedState}>
      <Component />
    </ChecklistStateContext.Provider>
  );
};

const useChecklistState = (): ChecklistState =>
  useContext(ChecklistStateContext);

export { useChecklistState, withChecklistState };
