import { createUser, getUserInfoById, loginUser } from '../services/user.js'

export async function userRoutes(app) {
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const user = await createUser({
        username: req.body.username,
        password: req.body.password,
      })

      return res.status(201).json({ username: user.username })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: 'failed to create' })
    }
  })

  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser({
        username: req.body.username,
        password: req.body.password,
      })

      return res.json({ token })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: 'failed to login' })
    }
  })

  app.get('/api/v1/users/:id', async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)

    return res.json(userInfo)
  })
}
