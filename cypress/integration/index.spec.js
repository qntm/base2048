/* global describe, it, cy */

describe('base1 in the browser', () => {
  it('works', () => {
    cy.visit('http://localhost:3000/server/index.html')
    cy.contains('ahoy there')
  })
})
