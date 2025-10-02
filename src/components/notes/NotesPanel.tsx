import type { Note } from '@/types/notes'
import { AddNoteForm } from './AddNoteForm'
import { NoteDetail } from './NoteDetail'
import { MessageSquare } from 'lucide-react'

type NotesPanelProps = {
  notes: Note[]
}

export const NotesPanel = ({ notes } : NotesPanelProps) => {
  return (
      <div className='w-full'>
        <div className='pt-2 pb-1'>
          <div className="flex items-center gap-3">
            <div className="rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-semibold text-white">Notas</h4>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto max-h-52 pr-2
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-slate-800/20
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-slate-500/60
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:border-2
          [&::-webkit-scrollbar-thumb]:border-slate-900/10
          hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/80
          [&::-webkit-scrollbar-thumb]:transition-colors
          dark:[&::-webkit-scrollbar-thumb]:bg-slate-600/60
          dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/70
        ">
          {notes.length ? (
            notes.map(note => (
              <NoteDetail key={note._id} note={note} />
            ))
          ) : (
            <div className="text-center py-8 text-white">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No hay notas</p>
            </div>
          )}
        </div>
        <AddNoteForm />
      </div>
  )
}
