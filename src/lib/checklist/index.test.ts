import {
  moveTask,
  addTask,
  deleteTask,
  updateTask,
  deleteCompletedTasks,
  toggleTaskCompletion
} from '.'
import type { Checklist, Task } from './index.types'

const checklist: Checklist = {
  id: '1',
  title: 'Test Checklist',
  taskOrder: ['task-1', 'task-2', 'task-3'],
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Eat Food',
      completed: false
    },
    'task-2': {
      id: 'task-2',
      title: 'Drink Water',
      completed: false
    },
    'task-3': {
      id: 'task-3',
      title: 'Eat Dessert',
      completed: false
    }
  }
}

describe('checklist', () => {
  it('should moveTask()', () => {
    expect(moveTask(0, 2, checklist).taskOrder).toStrictEqual([
      'task-2',
      'task-3',
      'task-1'
    ])
    expect(moveTask(0, 1, checklist).taskOrder).toStrictEqual([
      'task-2',
      'task-1',
      'task-3'
    ])
  })

  it('should addTask', () => {
    const newTask: Task = {
      id: 'new-task',
      title: 'New',
      completed: false
    }

    const updatedChecklist = addTask(newTask, checklist)

    expect(updatedChecklist.taskOrder).toStrictEqual([
      'task-1',
      'task-2',
      'task-3',
      'new-task'
    ])
    expect(updatedChecklist.tasks['new-task']).toStrictEqual({
      id: 'new-task',
      title: 'New',
      completed: false
    })
  })

  it('should deleteTask', () => {
    const updatedChecklist = deleteTask('task-1')(checklist)

    expect(updatedChecklist.taskOrder).toStrictEqual(['task-2', 'task-3'])
    expect(updatedChecklist.tasks['task-1']).toBeUndefined()
  })

  it('should updateTask', () => {
    const updatedChecklist = updateTask(
      'task-1',
      { title: 'Updated' },
      checklist
    )

    expect(updatedChecklist.tasks['task-1']).toStrictEqual({
      id: 'task-1',
      title: 'Updated',
      completed: false
    })
  })

  it('should delete completed tasks', () => {
    const checklistWithCompleted = {
      ...checklist,
      tasks: {
        ...checklist.tasks,
        'new-task-1': {
          id: 'new-task-1',
          title: 'hi',
          completed: true
        },
        'new-task-2': {
          id: 'new-task-2',
          title: 'hi',
          completed: true
        }
      },
      taskOrder: [...checklist.taskOrder, 'new-task-1', 'new-task-2']
    }
    const updatedChecklist = deleteCompletedTasks(checklistWithCompleted)

    expect(updatedChecklist.taskOrder).toStrictEqual(checklist.taskOrder)
    expect(updatedChecklist.tasks).toStrictEqual(checklist.tasks)
  })

  it('should toggle tasks', () => {
    const updatedChecklist = toggleTaskCompletion('task-1', checklist)

    expect(updatedChecklist.tasks['task-1'].completed).toBeTruthy()

    const updatedChecklist2 = toggleTaskCompletion('task-1', updatedChecklist)

    expect(updatedChecklist2.tasks['task-1'].completed).toBeFalsy()
  })
})
