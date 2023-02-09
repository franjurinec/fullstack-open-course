/// <reference types="Cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'root',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Logged in as Test User!')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password!')
        .parent()
        .should('have.css', 'background-color', 'rgb(229, 62, 62)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'password' })
    })

    const blogExample = {
      title: 'Test Blog',
      author: 'Johnny',
      url: 'http://example.blog.url'
    }

    const blogExample2 = {
      title: 'Another Blog',
      author: 'Jimmy',
      url: 'http://example2.blog.url'
    }

    const blogHeader = (blog) => `${blog.title} ${blog.author}`

    const createBlog = (blog) => {
      cy.contains('button', 'New Blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#blog-submit').click()
    }

    it('A blog can be created', function () {
      createBlog(blogExample)
      cy.contains(blogHeader(blogExample))
    })

    it('A blog can be liked', function () {
      createBlog(blogExample)
      cy.contains(blogHeader(blogExample)).click()
      cy.contains('button', 'Like').click()
      cy.contains('1 like(s)')
    })

    it('A blog can be deleted', function () {
      createBlog(blogExample)
      const header = blogHeader(blogExample)
      cy.contains(blogHeader(blogExample)).click()
      cy.contains('Added by Test User')
      cy.contains('button', 'Remove Blog').click()
      cy.contains(header).should('not.exist')
    })

    it('A blog cannot be deleted by users other than creator', function () {
      createBlog(blogExample)

      const user = {
        name: 'Other Test User',
        username: 'user',
        password: 'password'
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login(user)

      cy.contains(blogHeader(blogExample)).click()
      cy.contains('button', 'remove').should('not.exist')
    })

    it('Blogs are sorted by like count', function () {
      createBlog(blogExample)
      const header1 = blogHeader(blogExample)

      createBlog(blogExample2)
      const header2 = blogHeader(blogExample2)

      cy.contains(header1).click()
      cy.contains('button', 'Like').click()
      cy.contains('1 like(s')

      cy.visit('http://localhost:3003/')
      cy.get('.blog').eq(0).contains(header1)
      cy.get('.blog').eq(1).contains(header2)

      cy.contains(header2).click()
      cy.contains('button', 'Like').click()
      cy.contains('1 like(s')
      cy.contains('button', 'Like').click()
      cy.contains('2 like(s')

      cy.visit('http://localhost:3003/')
      cy.get('.blog').eq(0).contains(header2)
      cy.get('.blog').eq(1).contains(header1)
    })
  })
})
