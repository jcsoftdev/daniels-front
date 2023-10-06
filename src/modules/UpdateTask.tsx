'use client'

import TaskSubmission from '@/src/components/TaskSubmission'
import { getTask } from '@/src/services/tasks.service'
import { useQuery } from '@tanstack/react-query'

const UpdateTask = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['task'],
    queryFn: () => getTask(id)
  })

  console.log({ data })
  return (
    <div className="py-6">
      <TaskSubmission data={data?.task} />
    </div>
  )
}

export default UpdateTask
