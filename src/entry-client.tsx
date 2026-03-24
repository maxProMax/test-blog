import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error('Root element (#root) not found')
}

const router = createBrowserRouter(routes)

hydrateRoot(
  rootEl,
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>,
)
