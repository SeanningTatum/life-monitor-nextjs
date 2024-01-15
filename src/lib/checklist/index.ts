/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import * as R from 'ramda'

import type { Checklist, Task } from './types'

const moveTask = R.curry((from: number, to: number, checklist: Checklist) =>
  produce(checklist, (draft) => {
    const taskId = draft.taskOrder[from]

    draft.taskOrder = R.remove(from, 1, draft.taskOrder)
    draft.taskOrder = R.insert(to, taskId, draft.taskOrder)
  })
)

const addTask = R.curry((newTask: Task, checklist: Checklist) =>
  produce(checklist, (draft) => {
    draft.tasks[newTask.id] = newTask
    draft.taskOrder.push(newTask.id)
  })
)

const deleteTask = R.curry((taskId: string, checklist: Checklist) =>
  produce(checklist, (draft) => {
    draft.tasks = R.omit([taskId], draft.tasks)
    draft.taskOrder = R.filter((id: string) => id !== taskId, draft.taskOrder)
  })
)

const updateTask = R.curry(
  (
    taskId: string,
    taskForm: Partial<Task>,
    checklist: Checklist
  ) =>
    produce(checklist, (draft) => {
      const updatedTask = R.mergeRight(draft.tasks[taskId], taskForm)

      if (updatedTask.id) {
        draft.tasks = R.omit([taskId], draft.tasks)
        draft.tasks[updatedTask.id] = updatedTask;
        const ndx = R.findIndex((id) => id === taskId, checklist.taskOrder);
        draft.taskOrder[ndx] = updatedTask.id

        // const deleteAndAdd = R.pipe<[Checklist], Checklist, Checklist>(
        //   deleteTask(taskId),
        //   addTask(updatedTask),
        // )
        return;
      }


      draft.tasks[taskId] = updatedTask;
    })
)

const deleteCompletedTasks = R.curry((checklist: Checklist) =>
  produce(checklist, (draft) => {
    const finishedTasks: Record<string, Task> = R.pickBy(
      (val) => val.completed === true,
      checklist.tasks
    )

    draft.taskOrder = R.difference(checklist.taskOrder, R.keys(finishedTasks))
    draft.tasks = R.pick(draft.taskOrder, checklist.tasks)
  })
)

const toggleTaskCompletion = R.curry(
  (taskId: string, kanbanBoard: Checklist) =>
    updateTask(
      taskId,
      {
        completed: !kanbanBoard.tasks[taskId].completed
      },
      kanbanBoard
    ) as Checklist
)

export {
  addTask,
  deleteTask,
  deleteCompletedTasks,
  moveTask,
  toggleTaskCompletion,
  updateTask
}

export type { Checklist, Task }
