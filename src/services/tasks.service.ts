import {
  createTaskGql,
  getAllTasksGql,
  getTaskGql,
  updateTaskGql
} from '@/src/gql/tasks.gql'
import request from 'graphql-request'

export interface TaskDTO {
  _id?: string
  dueDate: string
  reminderEmailFrequency: number
  sendRemindersTo: string[]
  startDate: string
  startReminderEmailsOn: string
  taskDescription: string
  taskName: string
  taskNumber: string
}

export interface TasksResponse {
  tasks: TaskDTO[]
}

export interface TaskResponse {
  task: TaskDTO
}

export const getTasks = () =>
  request<TasksResponse>({
    url: process.env.GRAPHQL_URL as string,
    document: getAllTasksGql
  })

export const getTask = (taskId: string) => {
  return request<TaskResponse>({
    url: process.env.GRAPHQL_URL as string,
    document: getTaskGql,
    variables: { taskId }
  })
}

export const createTask = (body: TaskDTO) => {
  return request<TasksResponse>({
    url: process.env.GRAPHQL_URL as string,
    document: createTaskGql,
    variables: { createTaskInput: body }
  })
}

export const updateTask = (body: TaskDTO & { id: string }) => {
  return request<TasksResponse>({
    url: process.env.GRAPHQL_URL as string,
    document: updateTaskGql,
    variables: { updateTaskInput: body }
  })
}
