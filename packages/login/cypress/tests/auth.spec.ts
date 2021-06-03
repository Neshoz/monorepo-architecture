describe('User Sign-in', () => {
  beforeEach(() => {
    cy
      .intercept('https://randomuser.me/api/*', { fixture: 'user.json' })
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

      cy.location('pathname').should('equal', `/user/${seed}`)
      cy.get('h1').should('contain', user.name.first)
      cy.get('h3').should('contain', user.email)
    })
  })
})