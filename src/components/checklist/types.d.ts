import type { Checklist, Task } from '@/lib/checklist/types';
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';

export interface ChecklistProps {
  onAddTask: (taskName: string) => void;
  onClickCheckbox: (taskId: string) => void;
  onDeleteCompletedTasks: () => void;
  onDeleteTask: (taskId: string) => void;
  onTaskMoved: (from: number, to: number) => void;
  onEditTask: (taskId: string, task: Partial<Task>) => void;

  checklist: Checklist;
}

export interface ChecklistState extends ChecklistProps {
  onClickAddTask: () => void;
  onDismissAddTask: () => void;
  onClickEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDragEnd: (dropResult: DropResult) => void;
  onSubmitNewTask: (taskName: string) => void;
  onSubmitEditTask: (taskId: string, task: Partial<Task>) => void;
  onDismissEditTask: () => void;

  isAdding: boolean;
  currentTaskId?: string;
}

export interface DraggableTaskProps {
  id: string;
  /*
   * Makes the component draggable
   */
  draggableProvided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
}

export interface TaskContextMenuProps {
  id: string;
  completed: boolean;
}

export interface TaskFormProps {
  dismiss: () => void;
  onSubmitForm: (taskName: string) => void;

  initialTaskName?: string;
}
