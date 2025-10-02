import { useAuth } from '@/hooks/useAuth'
import { useDeleteNote } from '@/hooks/useNoteMutation'
import type { Note } from '@/types/notes'
import { formatDateTime } from '@/utils/utils'
import { Trash, User } from 'lucide-react'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'

type NoteDetailProps = {
    note: Note
}

export const NoteDetail = ({ note } : NoteDetailProps) => {

  const { data, isLoading } = useAuth()

  const canDelete = useMemo(() => data?.data._id === note.createdBy._id, [data])

  const params = useParams()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const taskId = queryParams.get('viewTask')!;
  const projectId = params.projectId!

  const { mutate } = useDeleteNote(taskId)

  if(isLoading) return 'Cargando ...'

    return (
        <div className=" shadow-sm border-b py-2 border-gray-300">
            <div className='flex justify-between items-start gap-2 py-1'>
                <p className="text-sm text-white break-words whitespace-pre-wrap flex-1  max-w-[70%]">
                    {note.content}
                </p>
                {canDelete && (
                    <button
                        type='button'
                        className='bg-red-400 hover:bg-red-500 p-1 text-xs font-bol text-white cursor-pointer transition-colors rounded-md'
                        onClick={() => mutate({ projectId, taskId, noteId: note._id })}>
                        <Trash className='w-4 h-4' />
                    </button>
                )}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-300">
                <div className='flex gap-2'>
                    <User className='h-4 w-4' /><span>{note.createdBy.name}</span>
                </div>
                <span>{formatDateTime(note.createdAt)}</span>
            </div>
        </div>
    )
}
