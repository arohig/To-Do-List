# How to set up and run the tests

Navigate to the root folder: `cd todo`  
Run `ng serve` for the dev server  
Navigate to http://localhost:4200/

## Unit and Integration Tests

The unit and integration tests can be found in _src/app/app.component.spec.ts_ and _src/app/item/item.component.spec.ts_.

Run the unit and integration tests: `ng test`

## End-to-end Tests

The end-to-end tests can be found in _cypress/e2e/spec.cy.ts_.

Run the end-to-end tests: `ng e2e`

# Testing strategy

I followed a Test-Driven Development (TDD) strategy. While developing the application using the tutorial, I noted the valid and invalid test cases. I also jotted down the possible unit and integration tests while coding the ItemComponent and AppComponent.

For the unit tests, I broke up the testing into two parts: component class testing (class-only tests) and component DOM testing. The class-only tests were straightforward as they tested the individual components in isolation. The component DOM testing tested the interactions of components with DOM elements. While doing the component DOM testing, I also wrote the integration tests, which focused on the interactions between ItemComponent and AppComponent.

For the end-to-end tests, I revisited the specifications in the tutorial. I used Cypress as there is built-in support for the Cypress testing framework in Angular. Cypress is a Javascript framework built on Mocha.
