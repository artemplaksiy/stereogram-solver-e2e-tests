Cypress.Commands.add(
    "compareCanvasWithSnapshot",
    (snapshotName: string, timeout: number = 2000, shouldDiffer: boolean = false) => {
        cy.wait(timeout); // allow canvas to stabilize
        cy.get("canvas")
            .should("be.visible")
            .should(($canvas) => {
                const canvas = $canvas[0] as HTMLCanvasElement;
                expect(canvas.width, "canvas width").to.be.gt(0);
                expect(canvas.height, "canvas height").to.be.gt(0);
            })
            .then(($canvas) => cy.wrap($canvas))
            .then(($canvas) =>
                Cypress.Promise.try(() => cy.wrap($canvas).matchImageSnapshot(snapshotName))
            )
            .then(() => {
                if (shouldDiffer) {
                    throw new Error(
                        `Canvas matched snapshot "${snapshotName}", but was expected to differ.`
                    );
                }
            })
    }
);


Cypress.Commands.add("compareImgWithSnapshot", (referenceName: string, timeout: number = 2000) => {
    cy.wait(timeout); // TODO: it's nasty but otherwise it take an "old" <img>> that is still visible
    cy.get("img",)
        .should("be.visible")
        .should(($img) => {
            const img = $img[0] as HTMLImageElement;
            expect(img.naturalWidth).to.be.greaterThan(0);
            expect(img.naturalHeight).to.be.greaterThan(0);
        })
        .then(($img) => {
            cy.wrap($img).as("imgToCompare");
        })
        .then(() => {
            cy.get("@imgToCompare").matchImageSnapshot(referenceName);
        });
});


