const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "cypress/reports/",
  reportPath: "cypress/reports/html",
  metadata: {
    browser: {
      name: "Chrome",
      version: "123",
    },
    device: "Local test machine",
    platform: {
      name: process.platform,
      version: "latest",
    },
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "Stereogram Solver E2E Tests" },
      { label: "Execution Time", value: new Date().toLocaleString() }
    ]
  }
});
