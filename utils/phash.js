// phash-from-file.js

const fs = require("fs");
const sharp = require("sharp");
const { bmvbhash } = require("blockhash-core");

// Function to compute pHash from image file
async function computePHashFromFile(imagePath, blockSize = 16) {
  try {
    const image = sharp(imagePath).ensureAlpha().raw();
    const { data, info } = await image.toBuffer({ resolveWithObject: true });

    const imageData = {
      width: info.width,
      height: info.height,
      data: data,
    };

    const hash = bmvbhash(imageData, blockSize);
    console.log(`pHash (${blockSize}x${blockSize}) for ${imagePath}:`);
    console.log(hash);
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

const imagePath = process.argv[2];
if (!imagePath || !fs.existsSync(imagePath)) {
  console.error("Usage: node phash.js <path-to-image>");
  process.exit(1);
}

computePHashFromFile(imagePath);

