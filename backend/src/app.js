/** @type {import('express')} */
import express from 'express'
import cors from 'cors'
import { postsRoutes } from './routes/post.js'
import { userRoutes } from './routes/user.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

postsRoutes(app)
userRoutes(app)

export { app }
