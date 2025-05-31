import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("I open the stereogram solver page", () => {
    cy.visit("https://piellardj.github.io/stereogram-solver/");
});

When("I select a Shark stereogram", () => {
    cy.get("select#preset-select").select("shark.jpg");
});

Then("I should see a shark silhouette", () => {
    cy.get("canvas").get("canvas", { timeout: 10000 })
        .should("be.visible")
        .should(($canvas) => {
            expect($canvas[0].width).to.be.greaterThan(0);
            expect($canvas[0].height).to.be.greaterThan(0);
        })
        .then((canvas) => {
            const dataUrl = canvas[0].toDataURL();
            const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
            const actualPath = "cypress/tmp/result.png";
            cy.writeFile(actualPath, base64, "base64");

            const expectedPath = "cypress/fixtures/reference.png";
            const diffPath = "cypress/tmp/diff.png";

            cy.task("compareImages", {
                actualPath,
                expectedPath,
                diffPath,
            }).then((mismatchedPixels) => {
                expect(mismatchedPixels).to.be.lte(10, "Resulting image looks not the same as reference image");
            });
        });

});
