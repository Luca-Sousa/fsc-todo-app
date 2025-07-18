import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import { useAddTask } from "../hooks/data/use-add-task"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()
  const { mutate: addTask } = useAddTask()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "not_started",
    }

    addTask(task, {
      onSuccess: () => {
        toast.success("Tarefa adicionada com sucesso!")
        handleClose()
        reset({
          title: "",
          time: "morning",
          description: "",
        })
      },
      onError: () => {
        toast.error("Erro ao adicionar a tarefa. Por favor, tente novamente.")
      },
    })
  }

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    })
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>

              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form
                className="flex w-[336px] flex-col space-y-4"
                onSubmit={handleSubmit(handleSaveClick)}
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                  {...register("title", {
                    required: "O título é obrigatório.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O título não pode ser vazio."
                      }
                      return true
                    },
                  })}
                />

                <TimeSelect
                  errorMessage={errors?.ddescription?.message}
                  disabled={isSubmitting}
                  {...register("time", {
                    required: "O horário é obrigatório.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O horário não pode ser vazio."
                      }
                      return true
                    },
                  })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "A Descrição é obrigatória.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "A descrição não pode ser vazia."
                      }
                      return true
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    size="large"
                    color="secondary"
                    className="w-full"
                    onClick={handleCancelClick}
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    size="large"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.prototype = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddTaskDialog
