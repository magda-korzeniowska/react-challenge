context('Dynamic data guard', () => {
  it('should display no content component when response data is empty', () => {
    cy.intercept('GET', 'http://localhost:4320/ledger', []);
    cy.visit('/');

    cy.get('#portfel')
      .contains('Brak danych do wyświetlenia')
      .should('exist')
      .should('have.length', 1);
    cy.get('#portfel').get('button').should('exist');
    cy.get('table').should('not.exist');
  });

  it('should display error component when request fails', () => {
    cy.intercept('GET', 'http://localhost:4320/ledger', {
      statusCode: 400,
    });
    cy.visit('/');
    cy.wait(12000);
    cy.get('#portfel')
      .contains('Wystąpił nieoczekiwany błąd')
      .should('exist')
      .should('have.length', 1);
    cy.get('#portfel').get('button').should('exist');
    cy.get('table').should('not.exist');
    cy.get('#portfel').find('img').should('exist');
  });

  it('should display loader if request takes long time', () => {
    cy.intercept('GET', 'http://localhost:4320/ledger', {
      delay: 2000,
    });
    cy.visit('/');
    cy.get('#portfel')
      .get('.MuiCircularProgress-root')
      .should('exist')
      .should('have.length', 1);
    cy.get('#portfel').get('button').should('exist');
    cy.get('table').should('not.exist');
  });

  it('should load table when request went fine', () => {
    cy.visit('/');
    cy.get('table').should('exist');
  });
});
