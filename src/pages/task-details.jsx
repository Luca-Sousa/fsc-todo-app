import { useEffect, useRef, useState } from "react"
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
  const [errors, setErrors] = useState([])
  const [saveIsLoading, setSaveIsLoading] = useState(false)

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })

      const data = await response.json()
      setTask(data)
    }

    fetchTasks()
  }, [taskId])

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async () => {
    setSaveIsLoading(true)
    const newErrors = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      })
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O horário é obrigatório.",
      })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      })
    }

    setErrors(newErrors)
    if (newErrors.length > 0) return setSaveIsLoading(false)

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, time, description }),
    })

    if (!response.ok) {
      setSaveIsLoading(false)
      return toast.error(
        "Erro ao atualizar a tarefa. Por favor, tente novamente."
      )
    }

    const newTask = await response.json()
    setTask(newTask)
    toast.success("Tarefa atualizada com sucesso!")
    setSaveIsLoading(false)
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

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

          <Button color="danger" className="h-fit self-end">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <Input
            id="title"
            label="Título"
            defaultValue={task?.title}
            errorMessage={titleError?.message}
            ref={titleRef}
          />

          <TimeSelect
            defaultValue={task?.time}
            errorMessage={timeError?.message}
            ref={timeRef}
          />

          <Input
            id="description"
            label="Descrição"
            defaultValue={task?.description}
            errorMessage={descriptionError?.message}
            ref={descriptionRef}
          />
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
