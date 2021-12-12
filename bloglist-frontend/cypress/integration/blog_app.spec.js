describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { name: 'Dave Testman', username: 'dave', password: '1234' }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is show', function () {
    cy.contains('log in')
  })

  describe('Login', function () {
    it('suceeds with correct credentials', function () {
      cy.get('#username').type('dave')
      cy.get('#password').type('1234')
      cy.contains('log in').click()
      cy.contains('Dave Testman is logged in')
    })
    it('fails with incorrect credentials', function () {
      cy.get('#username').type('dave')
      cy.get('#password').type('999999999')
      cy.contains('log in').click()
      cy.contains('Invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      //custom command defined in cypress/support/commands
      cy.login({ username: 'dave', password: '1234' })
    })

    it('a blog can be created', function () {
      cy.contains('create blog').click()
      cy.get('#title').type('Cypress for E2E')
      cy.get('#author').type('Mr. Test Author')
      cy.get('#url').type('https://agreaturl.org')
      cy.contains('Submit').click()
      cy.get('html').contains('"Cypress for E2E" by Mr. Test Author')
    })

    it('a blog can be liked', function () {
      //custom command defined in cypress/support/commands
      cy.createBlog({
        title: 'A blog can be liked',
        author: 'Macy Grey',
        url: 'https://grey.com',
      })
      cy.visit('http://localhost:3000')
      cy.contains('details').click()
      cy.get('button').contains('like').click()
      cy.get('span').contains('likes : 1')
    })

    it('a blog added by logged in user can be removed', function () {
      cy.createBlog({
        title: 'A blog can be removed',
        author: 'Macy Grey',
        url: 'https://grey.com',
      })
      cy.visit('http://localhost:3000')
      cy.contains('remove blog').click().should('not.exist')
      cy.get('html').should('not.contain', 'A blog can be removed')
    })

    it.only('displayed blogs are sorted by likes in descending order', function () {
      cy.createBlog({
        title: 'Blog no1',
        author: 'Macy Grey',
        url: 'https://grey.com',
      })
      cy.createBlog({
        title: 'Blog no2',
        author: 'Macy Grey',
        url: 'https://grey.com',
      })
      cy.createBlog({
        title: 'Blog no3',
        author: 'Macy Grey',
        url: 'https://grey.com',
      })
      cy.visit('http://localhost:3000')
      //click like once
      cy.contains('Blog no2').contains('details').click()
      cy.contains('Blog no2').children('div').children('button').click()
      //click like 2 times
      cy.contains('Blog no3').contains('details').click()
      cy.contains('Blog no3').children('div').children('button').click().click()
      cy.visit('http://localhost:3000')
      cy.get('.blog').then(bloglist => {
        expect(bloglist[0]).to.contain.text('Blog no3')
        expect(bloglist[1]).to.contain.text('Blog no2')
        expect(bloglist[2]).to.contain.text('Blog no1')
      })
    })
  })
})
