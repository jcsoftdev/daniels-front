'use client'
import { TaskDTO, createTask, updateTask } from '@/src/services/tasks.service'
import { Button, Chip, Input, Textarea } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormValues {
  'task-number': string
  'task-name': string
  'task-description': string
  'due-date': string
  'start-date': string
  'start-reminder-on': string
  'reminder-frequency': string
  'send-reminder-to': string
}

interface InputItem {
  name: keyof IFormValues
  label: string
  component: (props: any) => React.ReactNode
  type?: string
  className?: string
}

const TaskSubmission = ({ data: defaultData }: { data?: TaskDTO }) => {
  const [sentTo, setSentTo] = useState<string[]>(
    defaultData?.sendRemindersTo ?? []
  )
  const createMutation = useMutation({
    mutationFn: createTask
  })

  const updateMutation = useMutation({
    mutationFn: updateTask
  })

  const { register, handleSubmit, reset, setValue } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = data => {
    const body: TaskDTO = {
      dueDate: new Date(data['due-date']).toISOString(),
      startDate: new Date(data['start-date']).toISOString(),
      reminderEmailFrequency: Number(data['reminder-frequency']),
      startReminderEmailsOn: new Date(data['start-reminder-on']).toISOString(),
      taskDescription: data['task-description'],
      taskName: data['task-name'],
      taskNumber: data['task-number'],
      sendRemindersTo: sentTo
    }

    if (defaultData) {
      updateMutation.mutate({ id: defaultData._id!, ...body })
      return
    }
    createMutation.mutate(body)
    reset()
  }

  useEffect(() => {
    if (defaultData) {
      const {
        dueDate,
        startDate,
        reminderEmailFrequency,
        startReminderEmailsOn,
        taskDescription,
        taskName,
        taskNumber,
        sendRemindersTo
      } = defaultData
      console.log({ startDate })
      setValue('task-number', taskNumber)
      setValue('start-date', new Date(startDate).toISOString().slice(0, 16))
      setValue('task-name', taskName)
      setValue('due-date', new Date(dueDate).toISOString().slice(0, 16))
      setValue('reminder-frequency', `${reminderEmailFrequency}`)
      setValue(
        'start-reminder-on',
        new Date(startReminderEmailsOn).toISOString().slice(0, 16)
      )
      setValue('task-description', taskDescription)
      setSentTo(sendRemindersTo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <p className="text-lg font-bold text-center">Create a Task</p>
      <div className="grid sm:grid-cols-12 gap-4">
        <div className="sm:col-span-2 hidden sm:block"></div>
        <Input
          {...register('start-date')}
          label="Start Date"
          type="datetime-local"
          size="md"
          placeholder="Start Date"
          className="sm:col-span-3"
        />
        <Input
          {...register('due-date')}
          label="Due Date"
          type="datetime-local"
          size="md"
          placeholder="Due Date"
          className="sm:col-span-3"
        />
        <Input
          {...register('reminder-frequency')}
          label="Frequency"
          type="number"
          size="md"
          placeholder="Reminder Frequency"
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2 hidden sm:block"></div>
        <div className="sm:col-span-12 hidden sm:block my-6"></div>
        <Input
          {...register('start-reminder-on')}
          label="Start Reminder On"
          type="datetime-local"
          size="md"
          placeholder="Start Reminder On"
          className="sm:col-span-3"
        />

        <Input
          {...register('task-number')}
          label="Task Number"
          size="md"
          placeholder="Task Number"
          className="sm:col-span-2"
        />

        <Input
          {...register('task-name')}
          label="Task Name"
          size="md"
          placeholder="Task Name"
          className="sm:col-span-7"
        />

        <Input
          {...register('send-reminder-to')}
          label="Send Reminder To"
          type="email"
          size="md"
          placeholder="Send Reminder To"
          className="sm:col-span-3"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              setSentTo([...sentTo, e.currentTarget.value])
              setValue('send-reminder-to', '')
            }
          }}
        />
        <div className="sm:col-span-9 flex gap-3">
          {sentTo.map((email, index) => (
            <Chip
              key={email}
              onClose={() => {
                const newSentTo = [...sentTo]
                newSentTo.splice(index, 1)
                setSentTo(newSentTo)
              }}
              // variant="bordered"
              color="primary"
            >
              {email}
            </Chip>
          ))}
        </div>
        <Textarea
          {...register('task-description')}
          label="Task Description"
          size="md"
          // labelPlacement="outside"
          placeholder="Task Description"
          className="sm:col-span-12"
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit" variant="solid" color="secondary">
          {defaultData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default TaskSubmission
