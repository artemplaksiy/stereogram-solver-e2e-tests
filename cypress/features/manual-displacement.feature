Feature: Manually displaced stereogram should work correctly

    Background:
        Given I open the stereogram solver page

    Scenario: Stereogram should be solved by setting displacement manually
        When I upload my own stereogram "custom-stereogram-small.png"
        Then move displacement slider to "50" px
        Then back to "63" px
        Then I should see my stereogram silhouette

    @ignore
    Scenario: Stereogram should not be shown correctly with wrong displaceement
        When I upload my own stereogram "custom-stereogram-small.png"
        Then move displacement slider to "50" px
        Then I should not see my stereogram silhouette