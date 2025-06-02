import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { should } from "chai";
import 'cypress-file-upload';


Given("I open the stereogram solver page", () => {
    cy.visit("https://piellardj.github.io/stereogram-solver/");
});

When("I select a \"Shark\" stereogram", () => {
    cy.get("select#preset-select").select("shark.jpg");
});

When("I select a \"Thumbs up\" stereogram", () => {
    cy.get("select#preset-select").select("thumbsup.jpg");
});

When("I select a \"Planet\" stereogram", () => {
    cy.get("select#preset-select").select("planet.jpg");
});

When("I select a \"Dolphins\" stereogram", () => {
    cy.get("select#preset-select").select("dolphins.jpg");
});

When("I select a \"Atomium\" stereogram", () => {
    cy.get("select#preset-select").select("atomium.jpg");
});

Then("I should see a shark silhouette", () => {
    cy.compareCanvasWithSnapshot("shark.png");
});

Then("I should see a thumbs up silhouette", () => {
    cy.compareCanvasWithSnapshot("thumbs-up.png");
});

Then("I should see a planet silhouette", () => {
    cy.compareCanvasWithSnapshot("planet.png");
});

Then("I should see a dolphins silhouettes", () => {
    cy.compareCanvasWithSnapshot("dolphins.png");
});

Then("I should see an atomium silhouette", () => {
    cy.compareCanvasWithSnapshot("atomium.png");
});

When("I upload my own stereogram {string}", (file: string) => {
    cy.get('input[type="file"]').attachFile(`images/sources/${file}`);
});

Then("I should see my stereogram silhouette", () => {
    cy.compareCanvasWithSnapshot("custom-stereogram-small.png");
});

When("I upload a large stereogram {string}", (file: string) => {
    cy.get('input[type="file"]').attachFile(`images/sources/${file}`);
});

Then('I should see the correct result within {string} seconds', (seconds: string) => {
    cy.compareCanvasWithSnapshot("custom-stereogram-large.png", parseInt(seconds, 10) * 1000);
});

Then('my custom stereogram should be displayed in Source image section', () => {
    cy.compareImgWithSnapshot("images/sources/custom-stereogram-small.png");
});

Then('my custom large stereogram should be displayed in Source image section', () => {
    cy.compareImgWithSnapshot("images/sources/custom-stereogram-large.png");
});

Then('move displacement slider to {string} px', (input: string) => {
    cy.get('.full-width-range')
        .invoke('val', input)
        .trigger('input');
});

Then('back to {string} px', (input: string) => {
    cy.get('.full-width-range')
        .invoke('val', input)
        .trigger('input');
});

Then('I should not see my stereogram silhouette', () => {
        cy.compareCanvasWithSnapshot("custom-stereogram-small.png", 2000, true);
});

When('I upload an empty stereogram {string}', (file: string) => {
    cy.get('input[type="file"]').attachFile(`images/sources/${file}`);
});

When('I upload a non-stereogram image {string}', (file: string) => {
    cy.get('input[type="file"]').attachFile(`images/sources/${file}`);
});

When('I upload a stereogram in an unsupported format {string}', (file: string) => {
    cy.get('input[type="file"]').attachFile(`images/sources/${file}`);
});

Then('I should see an error message {string}', (message: string) => {
    cy.get('.alert, .error-message')
      .should('be.visible')
      .and('contain', message);
});
