import { useAuth } from '@/hooks/useAuth'
import { useDeleteNote } from '@/hooks/useNoteMutation'
import type { Note } from '@/types/notes'
import { formatDate } from '@/utils/utils'
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
      <div className='p-3 flex justify-between items-center'>
          <div>
              <p>{note.content} por : <span className='font-bold'>{note.createdBy.name}</span></p>
              <p className='text-xs text-slate-500'>{formatDate(note.createdAt)}</p>
          </div>
          {canDelete && (
            <button 
                type='button'
                className='bg-red-400 hover:bg-red-500 p-2 text-xs font-bol text-white cursor-pointer transition-colors rounded-md'
                onClick={() => mutate({projectId, taskId, noteId: note._id})}>
                Eliminar
            </button>
          )}
      </div>
  )
}
