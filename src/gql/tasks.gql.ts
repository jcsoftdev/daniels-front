import { gql } from 'graphql-request'

export const getAllTasksGql = gql`
  query Tasks {
    tasks {
      _id
      dueDate
      reminderEmailFrequency
      sendRemindersTo
      startDate
      startReminderEmailsOn
      taskDescription
      taskName
      taskNumber
    }
  }
`

export const getTaskGql = gql`
  query Task($taskId: String!) {
    task(id: $taskId) {
      _id
      taskName
      taskDescription
      dueDate
      reminderEmailFrequency
      sendRemindersTo
      startDate
      startReminderEmailsOn
      taskNumber
    }
  }
`
export const createTaskGql = gql`
  mutation CreateTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      dueDate
      reminderEmailFrequency
      sendRemindersTo
      startDate
      startReminderEmailsOn
      taskDescription
      taskName
      taskNumber
    }
  }
`

export const updateTaskGql = gql`
  mutation UpdateTask($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      taskName
      dueDate
      sendRemindersTo
      reminderEmailFrequency
      startDate
      startReminderEmailsOn
      taskDescription
      taskNumber
    }
  }
`
