context('Display ledger', () => {
  beforeEach(() => cy.task('db:reset'));

  it('should display all rows', () => {
    cy.visit('/');
    cy.get('tbody').children('.MuiTableRow-root').should('have.length', 10);
  });

  it('should show ledger data', () => {
    cy.visit('/');
    const rows = cy.get('tbody').children('.MuiTableRow-root');

    const names = [
      'Wypłata',
      'Waga łazienkowa',
      'Chemia do kuchni',
      'Fryzjer',
      'Bilety do kina',
      'Zakup WIG20',
      'Składka na poduszkę finansową',
      'Ubezpieczene na życie - składka',
      'Usługi komunalne',
      'Energia',
    ];
    const categories = [
      'Nieskategoryzowane',
      'Różne',
      'Różne',
      'Wydatki prywatne',
      'Wydatki prywatne',
      'Inwestycje i oszczędności',
      'Inwestycje i oszczędności',
      'Ubezpieczenia',
      'Opłaty',
      'Opłaty',
    ];
    rows.each(($el, idx) => {
      cy.wrap($el).children().should('have.length', 5);

      cy.wrap($el)
        .children()
        .eq(0)
        .children()
        .first()
        .should('have.class', 'MuiCheckbox-root');
      cy.wrap($el).children().eq(1).should('have.text', names[idx]);
      cy.wrap($el).children().eq(2).should('have.text', categories[idx]);
      cy.wrap($el)
        .children()
        .eq(3)
        .should('include.text', new Date().getFullYear());
    });
  });
});
