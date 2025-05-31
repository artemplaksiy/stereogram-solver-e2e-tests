// cypress/support/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    compareCanvasWithReference(referenceName: string): Chainable<Subject>;
    compareImgWithReference(referenceName: string): Chainable<Subject>;
  }
}