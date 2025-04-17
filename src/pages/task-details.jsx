import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })

      const data = await response.json()
      setTask(data)
      reset(data)
    }

    fetchTasks()
  }, [reset, taskId])

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    })

    if (!response.ok) {
      return toast.error(
        "Erro ao atualizar a tarefa. Por favor, tente novamente."
      )
    }

    const newTask = await response.json()
    setTask(newTask)
    toast.success("Tarefa atualizada com sucesso!")
  }

  const handleDeleteCLick = async () => {
    setDeleteIsLoading(true)

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      )
    }

    setDeleteIsLoading(false)
    toast.success("Tarefa deletada com sucesso!")
    navigate(-1)
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full flex-1 space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div className="space-y-2">
            <button
              className="mb-3 flex size-8 items-center justify-center rounded-full bg-brand-primary"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-1 text-xs">
              <Link className="text-brand-text-gray" onClick={handleBackClick}>
                Minhas Tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <div className="text-xl font-semibold text-brand-primary">
              {task?.title}
            </div>
          </div>

          <Button
            color="danger"
            className="h-fit self-end"
            onClick={handleDeleteCLick}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <Input
              id="title"
              label="Título"
              {...register("title", {
                required: "O título é obrigatório.",
                validate: (value) => {
                  if (!value.trim()) {
                    return "O título não pode ser vazio."
                  }

                  return true
                },
              })}
              errorMessage={errors?.title?.message}
            />

            <TimeSelect
              {...register("time", {
                required: "O horário é obrigatório.",
                validate: (value) => {
                  if (!value.trim()) {
                    return "O horário não pode ser vazio."
                  }

                  return true
                },
              })}
              errorMessage={errors?.time?.message}
            />

            <Input
              id="description"
              label="Descrição"
              {...register("description", {
                required: "A descrição é obrigatória.",
                validate: (value) => {
                  if (!value.trim()) {
                    return "A descrição não pode ser vazia."
                  }

                  return true
                },
              })}
              errorMessage={errors?.description?.message}
            />
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button size="large" disabled={isSubmitting} type="submit">
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
