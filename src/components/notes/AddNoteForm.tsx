import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { createNote } from "@/api/NoteAPI"
import { useLocation, useParams } from "react-router-dom"
import type { NoteFormData } from "@/types/notes"

export const AddNoteForm = () => {

  const initialValues : NoteFormData = {
    content: ''
  }

  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const queryClient = useQueryClient()

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data.message)
        reset();
        queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    }
  })

  const hanldeAddNote = (formData : NoteFormData) => {
    mutate({ projectId, taskId, formData })
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
