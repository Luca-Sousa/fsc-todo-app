import { Toaster } from "sonner"

import Sidebar from "./components/sidebar"
import Tasks from "./components/Tasks"

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
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
