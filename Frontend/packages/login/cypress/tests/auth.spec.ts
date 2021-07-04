describe('User Sign-in', () => {
  beforeEach(() => {
    cy
      .intercept('http://localhost:5001/user/*')
      .as('getUser')
  })

  it('should allow a user to sign in', () => {
    cy.fixture('user.json').then((fixture) => {
      const [ user ] = fixture.results
      const { seed } = fixture.info

      cy.visit('/login')

      cy.getBySel('email-input').type(user.email)
      cy.getBySel('password-input').type(user.login.password)
      cy.getBySel('submit-button').click()

      cy.visit(`/user/${seed}`)

      cy.wait('@getUser')

      // cy.location('pathname').should('equal', `/user/${seed}`)
      cy.getBySel('user-firstname').should('contain', user.name.first)
      cy.getBySel('user-email').should('contain', user.email)
    })
  })

  it('should sign in a user - model', () => {

  })

  it('should sign in a user - commands', () => {
    
  })
})