# stereogram-solver-e2e-tests
This is a repository for e2e testing of https://piellardj.github.io/stereogram-solver/


## Testing framework

This testing repository is based on [Cypress](https://www.cypress.io/).

It follows the [Cucumber](https://cucumber.io/) BDD approach, utilizing https://github.com/badeball/cypress-cucumber-preprocessor and https://github.com/bahmutov/cypress-esbuild-preprocessor

### Write your own test case

You can use create you own `.feature` file to describe and test a new feature or reuse one of them. Example:

<pre> Feature: Selected stereograms should be displayed correctly

    Background:
        Given I open the stereogram solver page

    Scenario: "Shark" stereogram should be displayed correctly
        When I select a "Shark" stereogram
        Then I should see a shark silhouette </pre>

## Working with images

Orriginally a [pixelmatch](https://github.com/mapbox/pixelmatch) and then  [cypress-image-snapshot](https://github.com/jaredpalmer/cypress-image-snapshot) solutions was used to image comparison.
It turned out to be very depend on the browser or OS (emulated display size, etc) aspects, os the tests were a very unstable.

That is why I have implemented a [PHash](https://en.wikipedia.org/wiki/Perceptual_hashing) image comparison algorithm using [blockhash-core](https://github.com/LinusU/blockhash-core) package.

It allow me to remove all unnecesarry image files and its stereogram results from the repository. They are replaced by its `phash` values in `phashes.json` file.

#### Please note: 
You need to calculate and add a hash of any new image you want to use in tests. You can use it simply by executing a `phash.js` script in `utils/` directory like this:

`node phash.js <inpit-image>`

## Reporting capabilities

Tree way of reporting are implemented here:

1. [mocha-junit-reporter](https://github.com/michaelleeallen/mocha-junit-reporter) to be able to implement reporting to external resources
2. [multiple-cucumber-html-reporter](https://github.com/WasiqB/multiple-cucumber-html-reporter) to generate a HTML reports
3. [dorny/test-reporter](https://github.com/dorny/test-reporter) on the GH Action workflow level to be able to browse a resutls in the job summary details.

#### Note: a JUnit and HTML reports are puhblished as an artifacts of GH workflow run


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

## JUnit reports

After Cypress tests completed a junit XML reports will be generated in `results/junit/` directory.
