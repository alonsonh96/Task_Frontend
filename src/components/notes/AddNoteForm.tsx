import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom"
import type { NoteFormData } from "@/types/notes"
import { useCreateNote } from "@/hooks/useNoteMutation"
import ErrorMessage from "../ErrorMessage"

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

  const { mutate } = useCreateNote(taskId)

  const hanldeAddNote = (formData : NoteFormData) => {
    mutate({ projectId, taskId, formData })
    reset();
  }

  return (
    <form onSubmit={handleSubmit(hanldeAddNote)} className='space-y-3' noValidate>
        <div className='flex flex-col gap-2'>
            <label className='font-bold' htmlFor="content">Crear Nota</label>
            <input 
                id="content" 
                type="text" 
                placeholder='Contenido de la nota' 
                className='w-full p-3 border-gray-300'
                {...register('content', {
                    required: 'El contenido de la nota es obligatorio'
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>
        <input type="submit" value="Crear Nota"  className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer'/>
    </form>
  )
}
