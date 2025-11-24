describe('Alerts Tests', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should verify the first alert', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should verify the delayed alert', () => {
    cy.get('#timerAlertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should handle confirm alert with OK', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
      return true;
    });
    cy.get('#confirmResult').should('have.text', 'You selected Ok');
  });

  it('should handle confirm alert with Cancel', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('have.text', 'You selected Cancel');
  });

  it('should handle prompt alert with text input', () => {
    const testName = 'Test User';
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(testName);
    });
    cy.get('#promptButton').click();
    cy.get('#promptResult').should('contain', `You entered ${testName}`);
  });
});
