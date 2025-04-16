import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()

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
              <span
                className="cursor-pointer text-brand-text-gray"
                onClick={handleBackClick}
              >
                Minhas Tarefas
              </span>
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
          <Input id="title" label="Título" value={task?.title} />

          <TimeSelect value={task?.time} />

          <Input id="description" label="Descrição" value={task?.description} />
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="ghost">
            Cancelar
          </Button>

          <Button size="large">Salvar</Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
