describe('The login feature', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  it('fill form successfully', () => {
    cy.get('input[name="identifier"]').type('alex123');
    cy.get('input[name="password"]').type('thanh123');

    cy.get('button').click();

    cy.wait(5000);

    cy.getCookie('access_token').should('exist');

    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('div[data-cy="toggle-avatar"]').first().click();
    cy.get('div[data-cy="logout"]').last().click();
    cy.getCookie('access_token').should('not.exist');
  });
});
