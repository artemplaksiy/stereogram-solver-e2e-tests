@ignore
Feature: Stereogram solver negative tests

    Background:
        Given I open the stereogram solver page

    Scenario: Stereogram solver should correctly handle an empty stereogram
        When I upload an empty stereogram "empty-stereogram.png"
        Then I should see an error message "Please upload a valid stereogram image."


    Scenario: Stereogram solver should correctly handle a non-stereogram image
        When I upload a non-stereogram image "non-stereogram.png"
        Then I should see an error message "The uploaded image is not a valid stereogram."

    Scenario: Stereogram solver should correctly handle a unsupported file format
        When I upload a stereogram in an unsupported format "unsupported-format.pdf"
        Then I should see an error message "Unsupported image format. Please upload a PNG, JPEG, BPM or WEBP image."