describe('The home page', () => {
  it('Navigate page successfully', () => {
    cy.visit('localhost:3000');

    cy.get('a[data-cy="post"]').first().click();

    cy.wait(3000);

    cy.get('a[data-cy="author"]').click();

    cy.get('a[data-cy="logo"').click();
  });
});
