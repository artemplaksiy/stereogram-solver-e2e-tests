import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


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
    cy.compareCanvasWithReference("shark.png");
});

Then("I should see a thumbs up silhouette", () => {
    cy.compareCanvasWithReference("thumbs-up.png");
});

Then("I should see a planet silhouette", () => {
    cy.compareCanvasWithReference("planet.png");
});

Then("I should see a dolphins silhouettes", () => {
    cy.compareCanvasWithReference("dolphins.png");
});

Then("I should see an atomium silhouette", () => {
    cy.compareCanvasWithReference("atomium.png");
});
