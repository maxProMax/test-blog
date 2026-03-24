import ReactDOMServer from 'react-dom/server'
import { Request as RequestExpress } from 'express'
import { App } from './App'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom'
import { routes } from './routes'
import { createFetchRequest } from './request'

const handler = createStaticHandler(routes)

export async function render(req: RequestExpress) {
  const fetchRequest = createFetchRequest(req)
  const context = await handler.query(fetchRequest)

  if (context instanceof Response) {
    return context
  }

  const router = createStaticRouter(handler.dataRoutes, context)
  return ReactDOMServer.renderToString(
    <App>
      <StaticRouterProvider router={router} context={context} />
    </App>,
  )
}
