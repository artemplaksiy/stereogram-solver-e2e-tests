# stereogram-solver-e2e-tests
This is a repository for e2e testing of https://piellardj.github.io/stereogram-solver/

## Running Tests

To run all Cypress tests:

```bash
npx cypress run
```

### Run Tests with Tags

You can filter tests using tags:

```bash
npx cypress run --env TAGS='@large-stereogram'
```

### Run Tests in a Specific Browser

For example, to run tests in Chrome:

```bash
npx cypress run --browser chrome
```

## Generating HTML Report

After running the tests, generate the HTML report by executing:

```bash
node generate-report.js
```

This will generate a report from the test results.

## External Test Reporting Capabilities

After Cypress tests completed a junit XML reports will be generated in `results/junit/` directory.
