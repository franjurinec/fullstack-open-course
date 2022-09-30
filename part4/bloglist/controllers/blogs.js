const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.delete('/:id', async (req, res) => {
  const result = await Blog.findByIdAndDelete(req.params.id)
  res.status(204).json(result)
})

blogsRouter.put('/:id', async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).json(result)
})

blogsRouter.post('/', async (req, res) => {
  if (!(req.body.title && req.body.url))  {
    res.sendStatus(400)
    return
  }

  if (!req.body.likes) req.body.likes = 0

  const blog = new Blog(req.body)
  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRouter