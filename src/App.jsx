import Sidebar from "./components/sidebar"
import Task from "./components/Task"

function App() {
  return (
    <div className="flex gap-9">
      <Sidebar />
      <Task />
    </div>
  )
}

export default App
