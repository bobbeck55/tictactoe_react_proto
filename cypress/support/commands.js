// ***********************************************
// This example commands.js shows you how to
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


//import TestWinner from 'TestWinner'

Cypress.Commands.add('TestWinner', (squareIndices, searchText) => {

  cy.log("TestWinner command");

  for (let i = 0; i < squareIndices.length; i++) {

    cy.get('.square').each(($el, index, $list) => {

      if (squareIndices[i] === index)
      {
        cy.log("index to click: ", index, squareIndices[i]);
        cy.wrap($el.click());
        cy.wait(0.1);
      }

    })
  }

  return cy.get('.status').should('have.text', searchText);

})
