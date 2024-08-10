/// <reference types="Cypress" />
import { Homepage } from "../../support/pageObject/demoqa/homepage";

const homepage = new Homepage();

describe('Page Load Tests', () => {
  it('Page should be loaded correctly', () => {
    cy.log('Intercept the network request for the page')
    cy.intercept('GET', 'https://demoqa.com').as('getData');

    cy.log('Navigate to the page...')
    cy.visit('https://demoqa.com');

    cy.log('Check if we have the right URL')
    cy.url().should('include', 'demoqa.com')

    cy.log('Check for different page elements')
    cy.get(homepage.headerPicture).should('be.visible')
    cy.get(homepage.seleniumBanner).should('be.visible')
    cy.get(homepage.categoriesCards).should('be.visible')
    cy.get(homepage.card).should('have.length', 6)

    cy.log('Check for the network response')
    cy.wait('@getData').its('response.statusCode').should('eq', 200)
  })
})