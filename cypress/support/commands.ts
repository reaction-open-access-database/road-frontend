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

import type { MessageModel } from "inbucket-js-client";

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-cy*=${selector}]`, ...args)
})

Cypress.Commands.add("resetDatabase", () => {
    cy.request(
      "POST",
      Cypress.env("RESET_DB_URL"),
      {
          secret: Cypress.env("RESET_DB_SECRET"),
      },
    );
})

Cypress.Commands.add("register", (username, email, password) => {
    cy.visit("/accounts/register");
    cy.get("input[name='username']").type(username);
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.getBySel("register").click();

    cy.task("get_latest_email", email).then((email: MessageModel) => {
        cy.visit(email.body.text.match(/http:\/\/\S+/)[0]);
    });
})

Cypress.Commands.add("login", (username, password) => {
    cy.visit("/accounts/login");
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.getBySel("login").click();
})

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            getBySel(selector: string, ...args: any[]): Chainable<any>;
            getBySelLike(selector: string, ...args: any[]): Chainable<any>;
            resetDatabase(): Chainable<any>;
            register(username: string, email: string, password: string): Chainable<any>;
            login(username: string, password: string): Chainable<any>;
        }
    }
}