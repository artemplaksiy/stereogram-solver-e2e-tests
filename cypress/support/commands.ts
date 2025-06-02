import { bmvbhash } from "blockhash-core";

Cypress.Commands.add(
  "compareCanvasWithPHash",
  (expectedHash: string, blockSize: number = 16, threshold: number = 10) => {
    cy.wait(1000); //TODO: yes it's nasty!
    cy.get("canvas")
      .should("be.visible")
      .then(($canvas) => {
        const canvas = $canvas[0] as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not get canvas 2D context");

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const actualHash = bmvbhash(imageData, blockSize);

        const distance = hammingDistance(actualHash, expectedHash);
        Cypress.log({
          name: "PHash Compare",
          message: `Actual hash: ${actualHash}, Expected: ${expectedHash}, Distance: ${distance}`,
        });

        expect(distance).to.be.lte(threshold);
      });
  }
);


Cypress.Commands.add(
  "compareImgWithPHash",
  (expectedHash: string, blockSize: number = 16, threshold: number = 10) => {
    cy.wait(1000);
    cy.get("img")
      .should("be.visible")
      .then(($img) => {
        const img = $img[0] as HTMLImageElement;

        if (!img.complete) {
          throw new Error("Image not fully loaded");
        }

        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not get canvas 2D context");

        context.drawImage(img, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const actualHash = bmvbhash(imageData, blockSize);

        const distance = hammingDistance(actualHash, expectedHash);
        Cypress.log({
          name: "PHash Compare (img)",
          message: `Actual hash: ${actualHash}, Expected: ${expectedHash}, Distance: ${distance}`,
        });

        expect(distance).to.be.lte(threshold);
      });
  }
);


// Simple Hamming distance function
function hammingDistance(hash1: string, hash2: string): number {
  if (hash1.length !== hash2.length) {
    throw new Error("Hashes must be the same length");
  }
  let dist = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) dist++;
  }
  return dist;
}


