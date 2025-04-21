import DashbaordCards from "../components/DashboardCards"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import TaskItem from "../components/TaskItem"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 space-y-6 px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <DashbaordCards />

        <div className="grid grid-cols-[2.5fr_1.5fr] gap-6">
          <div className="space-y-6 rounded-[10px] bg-white p-6">
            <div>
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-sm text-brand-text-gray">
                Resumo das tarefas disponíveis
              </span>
            </div>

            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center rounded-[10px] bg-white p-6">
            <p className="max-w-md text-center text-brand-text-gray">
              Cada pequena ação de hoje te aproxima das grandes conquistas de
              amanhã. Faça o que precisa ser feito!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
