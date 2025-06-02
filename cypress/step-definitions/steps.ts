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
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareCanvasWithPHash(hashes["shark-result"])
    );
});

Then("I should see a thumbs up silhouette", () => {
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareCanvasWithPHash(hashes["thumbs-up-result"])
    );
});

Then("I should see a planet silhouette", () => {
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareCanvasWithPHash(hashes["planet-result"])
    );
});

Then("I should see a dolphins silhouettes", () => {
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareCanvasWithPHash(hashes["dolphins-result"])
    );
});

Then("I should see an atomium silhouette", () => {
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareCanvasWithPHash(hashes["atomium-result"])
    );
});

When("I upload my own stereogram {string}", (file: string) => {
    cy.get('input[type="file"]').attachFile(`images/sources/${file}`);
});

Then("I should see my stereogram silhouette", () => {
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareCanvasWithPHash(hashes["custom-stereogram-small-result"])
    );
});

When("I upload a large stereogram {string}", (file: string) => {
    cy.get('input[type="file"]').attachFile(`images/sources/${file}`);
});

Then('I should see the correct result within {string} seconds', (seconds: string) => {
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareCanvasWithPHash(hashes["custom-stereogram-large-result"])
    );
});

Then('my custom stereogram should be displayed in Source image section', () => {
        cy.fixture("hashes.json").then((hashes) =>
        cy.compareImgWithPHash(hashes["custom-stereogram-small-source"])
    );
});

Then('my custom large stereogram should be displayed in Source image section', () => {
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareImgWithPHash(hashes["custom-stereogram-large-source"])
    );
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
    cy.fixture("hashes.json").then((hashes) =>
        cy.compareCanvasWithPHash(hashes["custom-stereogram-small-result"], 16, 10, true)
    );
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
