import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import dotenv from 'dotenv'
import { generateSitemap } from './src/generateSitemap.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createDevServer() {
  const app = express()

  const vite = await import('vite')
  const viteServer = await vite.createServer({
    server: { middlewareMode: true, appType: 'custom' },
  })

  app.use(viteServer.middlewares)

  app.use(async (req, res, next) => {
    if (req.originalUrl === '/sitemap.xml') {
      const sitemap = await generateSitemap()

      return res
        .status(200)
        .send({ 'Content-Type': 'application/xml' })
        .end(sitemap)
    }
    try {
      const templateHtml = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )

      const template = await vite.transformIndexHtml(
        req.originalUrl,
        templateHtml,
      )
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
      const appHtml = await render(req)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      return res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.log(e)

      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  return app
}

async function createProdServer() {
  const app = await express()

  app.use((await import('compression')).default())
  app.use(
    (await import('serve-static')).default(
      path.resolve(__dirname, 'dist/client'),
      { index: false },
    ),
  )
  app.use(async (req, res, next) => {
    if (req.originalUrl === '/sitemap.xml') {
      const sitemap = await generateSitemap()

      return res
        .status(200)
        .send({ 'Content-Type': 'application/xml' })
        .end(sitemap)
    }
    try {
      const template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8',
      )

      // const template = await vite.transformIndexHtml(
      //   req.originalUrl,
      //   templateHtml,
      // )
      const render = (await import('./dist/server/entry-server.js')).render
      const appHtml = await render(req)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.log(e)

      // vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  return app
}

if (process.env.NODE_ENV === 'production') {
  const app = await createProdServer()
  app.listen(process.env.PORT, () => {
    console.log(
      `ssrc production server running on http://localhost:${process.env.PORT}`,
    )
  })
} else {
  const app = await createDevServer().catch((e) => console.error(e))

  app.listen(process.env.PORT, () => {
    console.log(
      `ssrc dev server running on http://localhost:${process.env.PORT}`,
    )
  })
}
