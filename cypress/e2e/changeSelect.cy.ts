describe('정렬 Select 테스트', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.visit('/');
  });

  it('Category select change가 적절하게 되는지 테스트', () => {
    cy.get('#category-select').select('중식');
    cy.get('.restaurant-list')
      .children()
      .each((restaurantCard: any) => {
        cy.wrap(restaurantCard).get('.category-icon').should('have.attr', 'alt', '중식');
      });

    cy.get('#category-select').select('한식');
    cy.get('.restaurant-list')
      .children()
      .each((restaurantCard: any) => {
        cy.wrap(restaurantCard).get('.category-icon').should('have.attr', 'alt', '한식');
      });
  });
});
