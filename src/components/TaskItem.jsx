const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary bg-opacity-10 text-brand-primary"
    }

    if (task.status === "in_progress") {
      return "bg-brand-process bg-opacity-10 text-brand-process"
    }

    if (task.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue"
    }
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  )
}

export default TaskItem
