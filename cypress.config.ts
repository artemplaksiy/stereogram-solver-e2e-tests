import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import fs from "fs";
import { PNG } from "pngjs";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);

      on("task", {
        async compareImages({ actualPath, expectedPath, diffPath }) {
          const pixelmatch = (await import("pixelmatch")).default;

          const img1 = PNG.sync.read(fs.readFileSync(actualPath));
          const img2 = PNG.sync.read(fs.readFileSync(expectedPath));
          const { width, height } = img1;

          const diff = new PNG({ width, height });

          const mismatchedPixels = pixelmatch(
            img1.data,
            img2.data,
            diff.data,
            width,
            height,
            { threshold: 0.2 }
          );

          fs.writeFileSync(diffPath, PNG.sync.write(diff));
          return mismatchedPixels;
        },
      });

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
