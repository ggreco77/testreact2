// src/main.jsx
import React from "react"
import { createRoot } from "react-dom/client"
import { createHashRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import "./styles.css"
import { LanguageProvider } from "./components/LanguageContext"

// Router con hash (URL tipo .../testreact/#/TappetoElastico)
const router = createHashRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: { v7_startTransition: true }, // Opt-in a v7
  }
)

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
)

