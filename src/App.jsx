import { Toaster } from "sonner"

import Sidebar from "./components/sidebar"
import Task from "./components/Task"

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Task />
      <Toaster
        toastOptions={{
          style: {
            color: "brand-dark-blue",
          },
        }}
      />
    </div>
  )
}

export default App
