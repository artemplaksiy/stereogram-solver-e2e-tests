Feature: Solve a stereogram

    Scenario: Select a preselected stereogram and view the result
        Given I open the stereogram solver page
        When I select a Shark stereogram
        Then I should see a shark silhouette
