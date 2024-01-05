/* eslint-disable class-methods-use-this */
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi, vitest } from 'vitest'
import ChecklistView from './index.client';
import { ChecklistProps } from './types';

afterEach(cleanup);

describe('Checklist', () => {
  const baseProps: ChecklistProps = {
    checklist: {
      id: 'checklist',
      title: 'Test',
      tasks: {
        'task-1': {
          id: 'task-1',
          title: 'first test task',
          completed: false,
        },
        'task-2': {
          id: 'task-2',
          title: 'second test task',
          completed: false,
        },
        'task-3': {
          id: 'task-3',
          title: 'third test task',
          completed: true,
        },
      },
      taskOrder: ['task-1', 'task-2', 'task-3'],
    },
    onAddTask: vitest.fn(), // ✅
    onClickCheckbox: vitest.fn(), // ✅
    onDeleteCompletedTasks: vitest.fn(), // ✅
    // Context menu actions can only be tested in cypress environments
    // https://github.com/radix-ui/primitives/issues/856
    onDeleteTask: vitest.fn(),
    onEditTask: vitest.fn(),
    onTaskMoved: vitest.fn(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(<ChecklistView {...baseProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('renders the appropriate number of tasks', async () => {
    const { findAllByTestId } = render(
      <ChecklistView {...baseProps} />
    );

    const tasks = await findAllByTestId('checklist-task');
    expect(tasks.length).toBe(3);
  });

  it('renders the correct amount of checked boxes', async () => {
    const { findAllByRole } = render(
      <ChecklistView {...baseProps} />
    );

    const checkedBoxes = (await findAllByRole('checkbox')).filter(
      (elem) => elem && elem.getAttribute('data-state') === 'checked'
    );

    expect(checkedBoxes.length).toBe(1);
  });

  describe('addTask', () => {
    it('should hide add task button if add task form is seen', async () => {
      const { findByTestId, queryByTestId } = render(
        <ChecklistView {...baseProps} />
      );

      const addTaskButton = await findByTestId('add-task-button');
      act(() => addTaskButton.click());

      const addTaskForm = await findByTestId('task-form');
      expect(addTaskForm).toBeTruthy();

      const addTaskButton2 = await queryByTestId('add-task-button');
      expect(addTaskButton2).toBeFalsy();
    });

    it('should disable submit button if task name is invalid', async () => {
      const checklistProps = { ...baseProps };
      const onAddTask = vi.spyOn(checklistProps, 'onAddTask');

      const { findByTestId } = render(
        <ChecklistView {...checklistProps} />
      );

      const addTaskButton = await findByTestId('add-task-button');
      await act(() => addTaskButton.click());

      const taskNameInput = await findByTestId('task-name-input');
      expect(taskNameInput).toBeTruthy();

      await act(() =>
        fireEvent.change(taskNameInput, { target: { value: '' } })
      );

      const taskForm = await findByTestId('task-form');
      expect(taskForm).toBeTruthy();

      await act(() => fireEvent.submit(taskForm));
      expect(onAddTask).toBeCalledTimes(0);
    });

    it('should call onAddTask after submitting add task form', async () => {
      const checklistProps = { ...baseProps };
      const onAddTask = vi.spyOn(checklistProps, 'onAddTask');

      const { findByTestId } = render(
        <ChecklistView {...checklistProps} />
      );

      const addTaskButton = await findByTestId('add-task-button');
      await act(() => addTaskButton.click());

      const taskNameInput = await findByTestId('task-name-input');
      expect(taskNameInput).toBeTruthy();

      await act(() =>
        fireEvent.change(taskNameInput, { target: { value: 'test' } })
      );

      const taskForm = await findByTestId('task-form');
      expect(taskForm).toBeTruthy();

      await act(() => fireEvent.submit(taskForm));
      expect(onAddTask).toBeCalledWith('test');
    });
  });

  it('should call onClickCheckbox after clicking a checkbox', async () => {
    const checklistProps = { ...baseProps };
    const onClickCheckbox = vi.spyOn(checklistProps, 'onClickCheckbox');

    const { findAllByTestId } = render(
      <ChecklistView {...checklistProps} />
    );

    const [checkbox] = await findAllByTestId('checklist-checkbox');
    await act(() => checkbox.click());

    expect(onClickCheckbox).toBeCalledWith('task-1');
  });

  it('should call onDeleteCompletedTasks after clicking delete completed tasks button', async () => {
    const checklistProps = { ...baseProps };
    const onClickCheckbox = vi.spyOn(checklistProps, 'onDeleteCompletedTasks');

    const { findByTestId } = render(
      <ChecklistView {...checklistProps} />
    );

    const removeDoneButton = await findByTestId('remove-done-button');
    await act(() => removeDoneButton.click());

    expect(onClickCheckbox).toBeCalled();
  });

  describe('editForm', () => {
    it('should show edit form properly', async () => {
      const checklistProps = { ...baseProps };

      const { findAllByTestId, findByTestId } = render(
        <ChecklistView {...checklistProps} />
      );

      const [contextMenuTrigger] = await findAllByTestId('checklist-task');
      await act(() => fireEvent.contextMenu(contextMenuTrigger));

      const taskContextMenu = await findByTestId('task-context-menu');
      expect(taskContextMenu).toBeTruthy();
    });

    it('should call onClickCheckbox properly in context menu', async () => {
      const checklistProps = { ...baseProps };
      const onClickCheckbox = vi.spyOn(checklistProps, 'onClickCheckbox');

      const { findAllByTestId, findByTestId } = render(
        <ChecklistView {...checklistProps} />
      );

      const [contextMenuTrigger] = await findAllByTestId('checklist-task');
      await act(() => fireEvent.contextMenu(contextMenuTrigger));

      const taskContextMenu = await findByTestId('task-context-menu');
      expect(taskContextMenu).toBeTruthy();


      const completeTaskContextMenuButton = await findByTestId("toggle-task-context-menu-button")

      await act(() => completeTaskContextMenuButton.click());

      expect(onClickCheckbox).toBeCalledWith('task-1');
    });
  });
});
