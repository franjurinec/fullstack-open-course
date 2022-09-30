const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
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
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('returned blogs contain a specific blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toContainEqual(expect.objectContaining(initialBlogs[0]))
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

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body).toContainEqual(expect.objectContaining(newBlog))
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
    
    const responseNoAuthor = await api.post('/api/blogs', newBlogMissingData)
    expect(responseNoAuthor.statusCode).toBe(400)
  })

})

describe('deleting blogs', () => {
  test('specific blog by id', async () => {
    const blogsResponse = await api.get('/api/blogs')
    const targetIndex = 0
    
    await api.delete(`/api/blogs/${blogsResponse.body[targetIndex].id}`)
      .expect(204)

    const newBlogsResponse = await api.get('/api/blogs')
    expect(newBlogsResponse.body).not.toContainEqual(blogsResponse.body[targetIndex])
  })
})

describe('updating blogs', () => {
  test('specific blog by id', async () => {
    const blogsResponse = await api.get('/api/blogs')
    const targetIndex = 0
    const newLikes = blogsResponse.body[targetIndex].likes + 10
    
    await api.put(`/api/blogs/${blogsResponse.body[targetIndex].id}`)
      .send({likes: newLikes})
      .expect(200)

    const newBlogsResponse = await api.get('/api/blogs')
    expect(newBlogsResponse.body[targetIndex].likes).toBe(newLikes)
  })
})
