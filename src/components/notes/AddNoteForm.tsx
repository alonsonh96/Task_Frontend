import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom"
import type { NoteFormData } from "@/types/notes"
import { useCreateNote } from "@/hooks/useNoteMutation"
import ErrorMessage from "../ErrorMessage"
import ButtonForm from "../ButtonForm"
import { NotebookPen } from "lucide-react"

export const AddNoteForm = () => {

  const initialValues : NoteFormData = {
    content: ''
  }

  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

  const { mutate, isPending } = useCreateNote(taskId)

  const hanldeAddNote = (formData : NoteFormData) => {
    mutate({ projectId, taskId, formData })
    reset();
  }

  return (
    <form onSubmit={handleSubmit(hanldeAddNote)} className='space-y-3 mt-2' noValidate>
        <div className='flex flex-col gap-2'>
            <label className="text-sm font-medium text-gray-900">Crear Nota</label>
            <textarea
                id="content"  
                placeholder='Contenido de la nota' 
                className={`w-full px-6 py-4 text-sm bg-gray-50 border border-gray-400 rounded-lg focus:border-gray-400 focus:bg-white transition-all duration-200 outline-none resize-none
                  ${errors.content
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300'}`}
                {...register('content', {
                    required: 'El contenido de la nota es obligatorio'
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>        
        <ButtonForm isPending={isPending} loadingText="Guardando...">
          <NotebookPen className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Crear nota
        </ButtonForm>
    </form>
  )
}
