describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress Test User',
      username: 'CypressTestUser',
      password: 'CypressTestPassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
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

  it('new blog can be created', function () {
    cy.contains('login').click()
    cy.get('#username').type('CypressTestUser')
    cy.get('#password').type('CypressTestPassword')
    cy.get('#login-button').click()
    cy.contains('Cypress Test User logged in')

    cy.contains('New Blog').click()
    cy.contains('Create new blog')
    cy.get('#title').type('A new blog created by a Cypress test')
    cy.get('#author').type('Cypress automated system test')
    cy.get('#url').type('https://www.iwantoneofthose.com/')
    cy.get('#createBlogButton').click()
    })

})
})