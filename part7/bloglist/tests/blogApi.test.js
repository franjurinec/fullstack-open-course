const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blogTestHelper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

let token = "";
beforeAll(async () => {
  await User.deleteMany({})

  const userData = {
    username: 'root',
    password: 'sekret'
  }

  await api
    .post('/api/users')
    .send(userData)
    .expect(201)

  const result = await api
    .post('/api/login')
    .send(userData)
    .expect(200)
    
  token = result.body.token;
});

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
      .set('Authorization', `bearer ${token}`)
      .expect(201)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs).toContainEqual(expect.objectContaining(newBlog))
  })

  test('fails with valid data but invalid user token', async () => {
    const newBlog = {
      title: 'Example Blog Title',
      author: 'John Doe',
      url: 'http://example.com/',
      likes: 8,
    }
    
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('undefined likes defaults to zero', async () => {
    const newBlogNoLikes = {
      title: 'Example Blog Title',
      author: 'John Doe',
      url: 'http://example.com/',
    }
    
    const response = await api.post('/api/blogs')
      .send(newBlogNoLikes)
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

})

describe('deleting blogs', () => {
  test('specific blog by id', async () => {
    const newBlog = {
      title: 'Example Blog Title',
      author: 'John Doe',
      url: 'http://example.com/',
      likes: 8,
    }
    
    const target = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)

    await api.delete(`/api/blogs/${target.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const stillExists = await helper.existsByID(target.body.id)
    expect(stillExists).toBeFalsy()
  })
})

describe('updating blogs', () => {
  test('specific blog by id', async () => {
    const newBlog = {
      title: 'Example Blog Title',
      author: 'John Doe',
      url: 'http://example.com/',
      likes: 8,
    }
    
    const target = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)

    const newLikes = target.body.likes + 10
    
    await api.put(`/api/blogs/${target.body.id}`)
      .send({likes: newLikes})
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const blog = await helper.blogByID(target.body.id)
    expect(blog.likes).toBe(newLikes)
  })
})
