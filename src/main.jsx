import "./index.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import App from "./App"
import TaskDetailsPage from "./pages/task-details"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      toastOptions={{
        style: {
          color: "brand-dark-blue",
        },
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
)
