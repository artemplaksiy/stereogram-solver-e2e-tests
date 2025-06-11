Feature: Uploaded stereograms should be displayed correctly

    Background:
        Given I open the stereogram solver page

    Scenario: Custom stereogram should be displayed correctly
        When I upload my own stereogram "custom-stereogram-small.png"
        Then my custom stereogram should be displayed in Source image section
        Then I should see my stereogram silhouette

    Scenario: Custom stereogram should be displayed correctly for WEBP format
        When I upload my own stereogram "skull.webp"
        Then my custom stereogram should be displayed in Source image section
        Then I should see my stereogram silhouette

    @large-stereogram
    Scenario: A large stereogram should be displayed correctly
        When I upload a large stereogram "custom-stereogram-large.png"
        Then I should see the correct result within "5" seconds
        Then my custom large stereogram should be displayed in Source image section
