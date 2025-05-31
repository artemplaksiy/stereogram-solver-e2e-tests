import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("I open the stereogram solver page", () => {
  cy.visit("https://piellardj.github.io/stereogram-solver/");
});

When("I select a Shark stereogram", () => {
    cy.get("select#preset-select").select("shark.jpg");
});

Then("I should see a shark silhouette", () => {
    cy.log("Magic can start!");
});
