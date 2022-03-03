context('Table data interactions', () => {
  beforeEach(() => cy.task('db:reset'));

  it('should allow to delete one ledger record', () => {
    cy.visit('/');

    cy.get('tbody').find('input[type="checkbox"]').first().click();
    cy.get('[data-testid="DeleteIcon"]').click();
    cy.get('tbody').contains('Nieskategoryzowane').should('not.exist');
    cy.get('tbody').children('.MuiTableRow-root').should('have.length', 10);
  });

  it('should allow deletion of all ledger records', () => {
    cy.visit('/');

    const row = cy.get('thead').children('.MuiTableRow-root').first();
    const checkAll = row.find('input[type="checkbox"]');

    checkAll.click();
    const deleteBtn = cy.get('[data-testid="DeleteIcon"]');
    deleteBtn.click();
    cy.get('#portfel').contains('Brak danych').should('exist');
  });

  it('should allow to delete many ledger records', () => {
    cy.visit('/');

    cy.get('tbody').find('input[type="checkbox"]').first().click();
    cy.get('tbody').find('input[type="checkbox"]').last().click();
    cy.get('[data-testid="DeleteIcon"]').click();
    cy.get('tbody').contains('Nieskategoryzowane').should('not.exist');
    cy.get('tbody').contains('Energia').should('not.exist');
    cy.get('tbody').children('.MuiTableRow-root').should('have.length', 10);
  });
});
