const { default: blogs } = require("../../src/services/blogs")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress Test User',
      username: 'CypressTestUser',
      password: 'CypressTestPassword'
    }
    const user2 = {
      name: 'Cypress Test User 2',
      username: 'CypressTestUser2',
      password: 'CypressTestPassword2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('CypressTestUser')
      cy.get('#password').type('CypressTestPassword')
      cy.get('#login-button').click()
      cy.contains('Cypress Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('CypressTestUser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(138, 43, 226)')
    })

  describe('When logged in',function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('CypressTestUser')
      cy.get('#password').type('CypressTestPassword')
      cy.get('#login-button').click()
      cy.contains('Cypress Test User logged in')
    })

  it('new blog can be created', function () {
    cy.contains('New Blog').click()
    cy.contains('Create new blog')
    cy.get('#title').type('A new blog created by a Cypress test')
    cy.get('#author').type('Cypress automated system test')
    cy.get('#url').type('https://www.iwantoneofthose.com/')
    cy.get('#createBlogButton').click()
    cy.contains('A new blog created by a Cypress test')
    })

  it('user can like a blog', function () {
    cy.contains('New Blog').click()
    cy.contains('Create new blog')
    cy.get('#title').type('A 2nd new blog created by a Cypress test')
    cy.get('#author').type('Cypress automated system test')
    cy.get('#url').type('https://www.iwantoneofthose.com/')
    cy.get('#createBlogButton').click()
    cy.contains('A 2nd new blog created by a Cypress test')
    cy.get('#blogViewButton').click()
    cy.contains('likes: 0')
    cy.get('#likeButton').click()
    cy.contains('likes: 1')
    })

  it('user can remove a blog that they created', function () {
    cy.contains('New Blog').click()
    cy.contains('Create new blog')
    cy.get('#title').type('A 2nd new blog created by a Cypress test')
    cy.get('#author').type('Cypress automated system test')
    cy.get('#url').type('https://www.iwantoneofthose.com/')
    cy.get('#createBlogButton').click()
    cy.contains('A 2nd new blog created by a Cypress test')
    cy.get('#blogViewButton').click()
    cy.get('#removeButton').click()
    cy.get('#blogViewButton').should('not.be.visible')
    })

  it('user cannot remove a blog that they didnt create', function () {
    cy.contains('New Blog').click()
    cy.contains('Create new blog')
    cy.get('#title').type('A new blog created by a Cypress test')
    cy.get('#author').type('Cypress automated system test')
    cy.get('#url').type('https://www.iwantoneofthose.com/')
    cy.get('#createBlogButton').click()
    cy.contains('A new blog created by a Cypress test')
    cy.contains('Logout').click()
    cy.contains('login').click()
    cy.get('#username').type('CypressTestUser2')
    cy.get('#password').type('CypressTestPassword2')
    cy.get('#login-button').click()
    cy.contains('Cypress Test User 2 logged in')
    cy.contains('A new blog created by a Cypress test')
    cy.get('#blogViewButton').click()
    cy.get('#removeButton').should('not.be.visible')
    })

    it.only('blogs are ordered according to likes', function () {
      cy.contains('New Blog').click()
      cy.contains('Create new blog')
      cy.get('#title').type('BLOG_A')
      cy.get('#author').type('Cypress automated system test')
      cy.get('#url').type('https://www.iwantoneofthose.com/')
      cy.get('#createBlogButton').click()
      cy.reload()
      cy.contains('BLOG_A')
      cy.get('#BLOG_AviewButton').click()
      cy.contains('likes: 0')
      cy.get('#BLOG_AlikeButton').click()
      cy.wait(2000)
      cy.get('#BLOG_AlikeButton').click()
      cy.wait(2000)
      cy.contains('likes: 2')


      cy.contains('New Blog').click()
      cy.contains('Create new blog')
      cy.get('#title').type('BLOG_B')
      cy.get('#author').type('Cypress automated system test')
      cy.get('#url').type('https://www.iwantoneofthose.com/')
      cy.get('#createBlogButton').click()
      cy.reload()
      cy.contains('BLOG_B')
      cy.get('#BLOG_BviewButton').click()
      cy.contains('likes: 0')
      cy.get('#BLOG_BlikeButton').click()
      cy.wait(2000)
      cy.get('#BLOG_BlikeButton').click()
      cy.wait(2000)
      cy.get('#BLOG_BlikeButton').click()
      cy.wait(2000)
      cy.get('#BLOG_BlikeButton').click()
      cy.wait(2000)
      cy.contains('likes: 4')

      cy.contains('New Blog').click()
      cy.contains('Create new blog')
      cy.get('#title').type('BLOG_C')
      cy.get('#author').type('Cypress automated system test')
      cy.get('#url').type('https://www.iwantoneofthose.com/')
      cy.get('#createBlogButton').click()
      cy.reload()
      cy.contains('BLOG_A')
      cy.contains('BLOG_B')
      cy.contains('BLOG_C')
      cy.get('#BLOG_CviewButton').click()
      cy.contains('likes: 0')
      cy.get('#BLOG_ClikeButton').click()
      cy.wait(2000)
      cy.get('#BLOG_ClikeButton').click()
      cy.wait(2000)
      cy.get('#BLOG_ClikeButton').click()
      cy.wait(2000)
      cy.get('#BLOG_ClikeButton').click()
      cy.wait(2000)
      cy.get('#BLOG_ClikeButton').click()
      cy.wait(2000)
      cy.contains('likes: 5')

      GET ALL blogs
      CHECK their order
      })

  })
})
})