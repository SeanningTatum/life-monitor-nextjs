'use client';

import { useCallback, useRef } from 'react';
import { Cross1Icon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from '@radix-ui/react-dropdown-menu';
import * as z from "zod"

import { type TaskFormProps } from '../types';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import useOutsideClickListener from '@/hooks/use-outside-click';

const formSchema = z.object({
  taskName: z.string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
}).required();

function TaskForm(props: TaskFormProps): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: props.initialTaskName ?? '',
    },
  })

  const onSubmitForm = useCallback(
    (values: z.infer<typeof formSchema>) => {
      const trimmed = values.taskName.trim();

      if (!trimmed) return;

      props.onSubmitForm(trimmed);
      props.dismiss();
    },
    [props]
  );

  useOutsideClickListener(formRef, props.dismiss);

  const isSubmitDisabled = form.getValues('taskName').length === 0;

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmitForm)} ref={formRef} data-testid="task-form">
        <Card>
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input data-testid="task-name-input" placeholder="Task Name" {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className='mt-4' />

          <div className='flex justify-end mt-2 gap-2 items-center'>
            <Button variant="destructive" onClick={props.dismiss} type="button">
              <Cross1Icon />
            </Button>

            <Button variant="default" disabled={isSubmitDisabled} type="submit">
              <PaperPlaneIcon />
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  );
}

export default TaskForm;
