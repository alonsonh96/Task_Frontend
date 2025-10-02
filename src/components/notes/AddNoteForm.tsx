import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom"
import type { NoteFormData } from "@/types/notes"
import { useCreateNote } from "@/hooks/useNoteMutation"
import { NotebookPen } from "lucide-react"
import TextAreaField from "@/components/ui/TextAreaField"
import ButtonForm from "@/components/ui/ButtonForm"
import LabelField from "@/components/ui/LabelField"

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
        <div className='flex flex-col'>
            <LabelField htmlFor="content">Añadir Nota</LabelField>
            <TextAreaField
              id="content"
              placeholder="Contenido de la nota"
              register={register('content', {
                required: 'El contenido de la nota es obligatorio'
              })}
              errors={errors.content}
            />
        </div>        
        <ButtonForm isPending={isPending} loadingText="Guardando...">
          <NotebookPen className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Crear nota
        </ButtonForm>
    </form>
  )
}
