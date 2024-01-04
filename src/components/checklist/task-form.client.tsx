'use client';

import { useCallback, useRef, useState } from 'react';
import { Cross1Icon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from '@radix-ui/react-dropdown-menu';
import * as z from "zod"

import useOutsideClickListener from '@/hooks/use-outside-click';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Button } from '../ui/button';

import { TaskFormProps } from './types';

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
    []
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
                  <Input placeholder="Task Name" {...field} autoFocus />
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
