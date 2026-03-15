describe('Sentiment-Aware UI Testing', () => {
  it('should change background color to green for positive sentiment', () => {
    cy.visit('/sentiment-demo');
    cy.get('textarea#input').type('Aplikasi ini sangat luar biasa dan membantu!');
    cy.get('button#analyze').click();

    // Verify AI state change in UI
    cy.get('.sentiment-badge')
      .should('contain', 'Positive')
      .and('have.css', 'background-color', 'rgb(34, 197, 94)');
  });

  it('should display warning for toxic input detected by guardrails', () => {
    cy.visit('/sentiment-demo');
    cy.get('textarea#input').type('Saya sangat membenci layanan ini.');
    cy.get('button#analyze').click();

    cy.get('.guardrail-alert')
      .should('be.visible')
      .and('contain', 'Toxic content detected');
  });
});