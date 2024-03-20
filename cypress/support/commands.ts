/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export const cyLogin = (email = 'admin@admin.com', password = 'asdqwe123') => {
  cy.session([email, password], () => {
    cy.visit('/login');

    cy.get('#\\:r1\\:-form-item').clear();
    cy.get('#\\:r1\\:-form-item').type(email);
    cy.get('#\\:r3\\:-form-item').clear();
    cy.get('#\\:r3\\:-form-item').type(password);
    cy.get('.inline-flex').click();

    cy.url().should('not.include', '/login');
  });
};
