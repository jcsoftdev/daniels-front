'use client'
import { TaskDTO, getTasks } from '@/src/services/tasks.service'
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const TaskList = () => {
  const router = useRouter()
  const { data, error, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-unit-24">
        Loading...
        <Spinner />
      </div>
    )
  }

  const columns = [
    {
      key: 'taskNumber',
      label: 'Number'
    },
    {
      key: 'taskName',
      label: 'Subject'
    },
    {
      key: 'sendRemindersTo',
      label: 'Send Reminders To'
    }
  ]

  const handleRowClick = (item: TaskDTO) => {
    router.push(`/task/${item._id!}`)
  }

  return (
    <div className="py-6">
      <h1 className="text-lg text-center font-semibold">Tasks</h1>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={data?.tasks ?? []}>
          {item => (
            <TableRow
              key={item.taskNumber}
              onClick={() => {
                handleRowClick(item)
              }}
            >
              {columnKey => (
                <TableCell>
                  {columnKey === 'sendRemindersTo' ? (
                    <div className="flex gap-1 flex-wrap">
                      {getKeyValue(item, columnKey).map((email: string) => (
                        <Chip
                          key={email}
                          // variant="bordered"
                          color="primary"
                        >
                          {email}
                        </Chip>
                      ))}
                    </div>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TaskList
