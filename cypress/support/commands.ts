Cypress.Commands.add("compareCanvasWithReference", (referenceName: string) => {
    cy.wait(2000);
    cy.get("canvas", { timeout: 10000 })
        .should("be.visible")
        .should(($canvas) => {
            expect($canvas[0].width).to.be.greaterThan(0);
            expect($canvas[0].height).to.be.greaterThan(0);
        })
        .then((canvas) => {
            const expectedPath = `cypress/fixtures/images/results/${referenceName}`;
            const actualPath = `cypress/tmp/${referenceName}`;
            const diffPath = `cypress/tmp/${referenceName}`;

            const base64 = (canvas[0] as HTMLCanvasElement).toDataURL().replace(/^data:image\/png;base64,/, "");

            cy.writeFile(actualPath, base64, "base64");

            cy.task("compareImages", {
                actualPath,
                expectedPath,
                diffPath,
            }).then((mismatchedPixels) => {
                expect(mismatchedPixels).to.be.lte(
                    10,
                    `Visual mismatch between ${referenceName} and rendered output`
                );
            });
        });
});

Cypress.Commands.add("compareImgWithReference", (referenceName: string) => {
    cy.wait(2000);
    cy.get("img", { timeout: 10000 })
        .should("be.visible")
        .should(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
            expect($img[0].naturalHeight).to.be.greaterThan(0);
        })
        .then(($img) => {
            const expectedPath = `cypress/fixtures/images/results/${referenceName}`;
            const actualPath = `cypress/tmp/${referenceName}`;
            const diffPath = `cypress/tmp/${referenceName}`;

            const img = $img[0] as HTMLImageElement;
            const src = img.src;

            cy.request({
                url: src,
                encoding: "binary",
            })
                .then((res) => Cypress.Buffer.from(res.body, "binary").toString("base64"))
                .then((base64) => {
                    cy.writeFile(actualPath, base64, "base64");

                    cy.task("compareImages", {
                        actualPath,
                        expectedPath,
                        diffPath,
                    }).then((mismatchedPixels) => {
                        expect(mismatchedPixels).to.be.lte(
                            10,
                            `Visual mismatch between ${referenceName} and rendered output`
                        );
                    });
                });
        });
});
