Cypress.Commands.add('getById', (selector, ...args) => {
    return cy.get(`[data-cy={selector}`, ...args);
});