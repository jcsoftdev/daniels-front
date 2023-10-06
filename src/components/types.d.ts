interface Task {
  taskNumber: string
  taskName: string
  taskDescription: string
  dueDate: Date | string
  startDate: Date | string
  startReminderEmailsOn: Date | string
  reminderEmailFrequency: number
  sendRemindersTo: string
}
