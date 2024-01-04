import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { Cross1Icon, PaperPlaneIcon } from '@radix-ui/react-icons';


import { TaskFormProps } from '../checklist.types';
import useOutsideClickListener from '@/app/hooks/use-outside-click';
import { Card } from '../ui/card';

function TaskForm(props: TaskFormProps): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const [taskName, setTaskName] = useState(props.initialTaskName ?? '');

  const onSubmitForm = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      const trimmed = taskName.trim();

      if (!trimmed) return;

      event.preventDefault();
      props.onSubmitForm(trimmed);
      props.dismiss();
    },
    [props, taskName]
  );

  useOutsideClickListener(formRef, props.dismiss);

  const isSubmitDisabled = taskName.length === 0;

  return (
    <form onSubmit={onSubmitForm} ref={formRef} data-testid="task-form">
      <Card>
        <TextFieldInput
          placeholder="Task name"
          className="border-none"
          size="3"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
          autoFocus
          data-testid="task-name-input"
        />
        <Separator size="4" mt="4" />
        <Flex justify="end" mt="2" gap="2" align="center">
          <IconButton
            type="button"
            variant="soft"
            color="red"
            onClick={props.dismiss}
          >
            <Cross1Icon />
          </IconButton>
          <IconButton variant="soft" type="submit" disabled={isSubmitDisabled}>
            <PaperPlaneIcon />
          </IconButton>
        </Flex>
      </Card>
    </form>
  );
}

export default TaskForm;
