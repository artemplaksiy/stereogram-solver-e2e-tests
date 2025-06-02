// cypress/support/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    compareCanvasWithPHash(expectedHash: string, blockSize?: number, threshold?: number, shouldBeDiffer?: boolean): Chainable<Subject>;
    compareImgWithPHash(expectedHash: string, blockSize?: number, threshold?: number): Chainable<Subject>;
  }
}