// cypress/support/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    compareCanvasWithSnapshot(referenceName: string, timeout?: number, shouldDiffer?: boolean): Chainable<Subject>;
    compareImgWithSnapshot(referenceName: string, timeout?: number): Chainable<Subject>;
  }
}