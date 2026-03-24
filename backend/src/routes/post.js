import { requireAuth } from '../middleware/jwt.js'
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostByTag,
  listPostsByAuthor,
  updatePost,
} from '../services/post.js'

export function postsRoutes(app) {
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }

    try {
      if (author && tag) {
        return res.status(400).json({ error: 'author or tag' })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostByTag(tag, options))
      }
      return res.json(await listAllPosts(options))
    } catch (error) {
      console.error(error)
      return res.status(500).end()
    }
  })

  app.get(`/api/v1/posts/:id`, async (req, res) => {
    const { id } = req.params

    try {
      const post = await getPostById(id)

      if (post === null) {
        return res.status(404).end()
      }

      return res.json(post)
    } catch (error) {
      console.error(error)

      return res.status(500).end()
    }
  })

  app.post('/api/v1/posts', requireAuth, async (req, res) => {
    try {
      const post = await createPost(req.auth.sub, req.body)

      return res.json(post)
    } catch (error) {
      console.error(error)
      return res.status(500).end()
    }
  })

  app.patch('/api/v1/posts/:id', requireAuth, async (req, res) => {
    try {
      const post = await updatePost(req.auth.sub, req.params.id, req.body)
      return res.json(post)
    } catch (error) {
      console.error(error)

      return res.status(500).end()
    }
  })

  app.delete('/api/v1/posts/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deletePost(req.auth.sub, req.params.id)
      if (deletedCount === 0) return res.status(404).end()
      return res.status(204).end()
    } catch (error) {
      console.error(error)

      return res.status(500).end()
    }
  })
}
