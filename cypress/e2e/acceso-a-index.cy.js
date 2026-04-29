describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://demo.testim.io/')
    cy.get('.Hero__headline-1___3C6vA').should('be.visible')
  })
})