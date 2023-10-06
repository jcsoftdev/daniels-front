import UpdateTask from '@/src/modules/UpdateTask'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="py-6">
        <UpdateTask id={params.id} />
      </div>
    </>
  )
}
