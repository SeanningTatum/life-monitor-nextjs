'use client'

import { useEffect, useState } from "react";
import { Droppable, type DroppableProps } from "react-beautiful-dnd";

// Hack to allow `react-beautiful-dnd` to work with React 18's strict mode
// Read more: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1167427762
export const StrictModeDroppable = ({ children, ...props }: DroppableProps): JSX.Element => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => { setEnabled(true); });

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return <></>;
  }

  return <Droppable {...props}>{children}</Droppable>;
};
