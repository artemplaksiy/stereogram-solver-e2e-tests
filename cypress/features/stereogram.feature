Feature: Selected stereograms should be displayed correctly

    Background:
        Given I open the stereogram solver page

    Scenario: "Shark" stereogram should be displayed correctly
        When I select a "Shark" stereogram
        Then I should see a shark silhouette

    Scenario: "Thumbs up" stereogram should be displayed correctly
        When I select a "Thumbs up" stereogram
        Then I should see a thumbs up silhouette

    Scenario: "Planet" stereogram should be displayed correctly
        When I select a "Planet" stereogram
        Then I should see a planet silhouette

    Scenario: "Dolphins" stereogram should be displayed correctly
        When I select a "Dolphins" stereogram
        Then I should see a dolphins silhouettes

    Scenario: "Atomium" stereogram should be displayed correctly
        When I select a "Atomium" stereogram
        Then I should see an atomium silhouette
