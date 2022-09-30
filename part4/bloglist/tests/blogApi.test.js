const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blogTestHelper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('for existing blogs', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('returned blogs contain a specific blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toContainEqual(expect.objectContaining(helper.initialBlogs[0]))
  })

  test('id property is correctly defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

})

describe('adding a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Example Blog Title',
      author: 'John Doe',
      url: 'http://example.com/',
      likes: 8,
    }
    
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs).toContainEqual(expect.objectContaining(newBlog))
  })

  test('undefined likes defaults to zero', async () => {
    const newBlogNoLikes = {
      title: 'Example Blog Title',
      author: 'John Doe',
      url: 'http://example.com/',
    }
    
    const response = await api.post('/api/blogs')
      .send(newBlogNoLikes)
      .expect(201)
    
    expect(response.body.likes).toBe(0)
  })

  test('fails with code 400 for missing title or url', async () => {
    const newBlogMissingData = {
      author: 'John Doe',
      likes: 8,
    }
    
    await api.post('/api/blogs')
      .send(newBlogMissingData)
      .expect(400)
  })

})

describe('deleting blogs', () => {
  test('specific blog by id', async () => {
    const target = await helper.getRandomBlog()

    await api.delete(`/api/blogs/${target.id}`)
      .expect(204)

    const stillExists = await helper.existsByID(target.id)
    expect(stillExists).toBeFalsy()
  })
})

describe('updating blogs', () => {
  test('specific blog by id', async () => {
    const target = await helper.getRandomBlog()
    const newLikes = target.likes + 10
    
    await api.put(`/api/blogs/${target.id}`)
      .send({likes: newLikes})
      .expect(200)

    const blog = await helper.blogByID(target.id)
    expect(blog.likes).toBe(newLikes)
  })
})
