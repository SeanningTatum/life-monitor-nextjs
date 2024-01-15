interface Task {
  id: string
  title: string
  completed: boolean

  optimistic?: boolean;
}

interface Checklist {
  readonly id: string
  title: string
  taskOrder: string[]
  tasks: Record<string, Task>
}

export type { Task, Checklist }
