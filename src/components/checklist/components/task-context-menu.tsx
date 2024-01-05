import { useChecklistState } from "../state";
import type { TaskContextMenuProps } from "../types";

import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@/components/ui/context-menu";

function TaskContextMenu(props: TaskContextMenuProps): JSX.Element {
  const { onDeleteTask, onClickEditTask, onClickCheckbox } =
    useChecklistState();

  return (
    <ContextMenuContent
      className="w-[200px]"
      data-testid="task-context-menu"
    >
      <ContextMenuItem
        inset
        onClick={() => onClickEditTask(props.id)}
        data-testid="edit-task-context-menu-button"
      >
        Edit
      </ContextMenuItem>
      <ContextMenuItem
        inset
        onClick={() => onClickCheckbox(props.id)}
        data-testid="toggle-task-context-menu-button"
      >
        {!props.completed ? 'Complete' : 'Unfinish'}
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem
        inset
        className="text-red-500"
        onClick={() => onDeleteTask(props.id)}
        data-testid="delete-task-context-menu-button"
      >
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  );
}

export default TaskContextMenu;
