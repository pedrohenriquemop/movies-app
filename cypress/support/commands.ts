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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to clear localStorage and then set a mock JWT token.
       * @example cy.setAuthToken('your-mock-jwt')
       */
      setAuthToken(token: string): Chainable<Element>;

      /**
       * Custom command to clear localStorage.
       * @example cy.clearAuth()
       */
      clearAuth(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("setAuthToken", (token: string) => {
  cy.clearAuth();
  cy.window().then((win) => {
    win.localStorage.setItem("jwt_token", token);
  });
});

Cypress.Commands.add("clearAuth", () => {
  cy.window().then((win) => {
    win.localStorage.removeItem("jwt_token");
  });
});
