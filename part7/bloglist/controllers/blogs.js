const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (!(user && blog && blog.user.toString() === user._id.toString())) {
    res.sendStatus(401)
    return
  }

  const result = await Blog.findByIdAndDelete(req.params.id, req.body)
  res.status(204).json(result)
})

blogsRouter.put('/:id', async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (!(user && blog.user.toString() === user._id.toString())) {
    res.sendStatus(401)
    return
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body)
  const result = await updatedBlog.populate('user')
  res.status(200).json(result)
})

blogsRouter.post('/', async (req, res) => {
  const user = req.user

  if (!user) {
    res.sendStatus(401)
    return
  }

  if (!(req.body.title && req.body.url)) {
    res.sendStatus(400)
    return
  }

  if (!req.body.likes) req.body.likes = 0

  const blog = new Blog({ user: user._id, ...req.body })
  const newBlog = await blog.save()
  user.blogs.push(newBlog._id)
  await user.save()

  const result = await newBlog.populate('user')
  res.status(201).json(result)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const user = req.user

  if (!user) {
    res.sendStatus(401)
    return
  }

  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.sendStatus(404)
    return
  }

  if (!req.body.comment) {
    res.sendStatus(400)
    return
  }

  blog.comments.push(req.body.comment)
  const updatedBlog = await blog.save()

  const result = await updatedBlog.populate('user')
  res.json(result)
})

module.exports = blogsRouter
