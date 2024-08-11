/// <reference types="Cypress" />
import { Homepage } from "../../support/pageObject/demoqa/homepage";
import { FormsSection } from "../../support/pageObject/demoqa/forms";
import { faker } from '@faker-js/faker';

const homepage = new Homepage();
const forms = new FormsSection();

describe('Elements Tests', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent Cypress from failing the test
      return false;
    });

    cy.log('Navigate to the page...')
    cy.visit('https://demoqa.com');
    cy.log('Go to Forms page')
    cy.get(homepage.cardText).contains('Forms').click()
    cy.url().should('include', '/forms')

    cy.log('Check that the Forms section is collapsed')
    // workaround used to get an unique element
    cy.get(forms.formsGroup).eq(1)
      .invoke('attr', 'test-data', 'Forms')
    cy.get(forms.formsListMenu).should('have.class', 'show')
  })

  it('Interact with Forms', () => {

    cy.log('Select the Practice Form')
    cy.get(forms.practiceFormButton).click()

    cy.log('Fill the form')
    cy.get(forms.firstNameField).click().type(faker.person.firstName(), {delay: 100})
    cy.get(forms.lastNameField).click().type(faker.person.lastName(), {delay: 100})
    cy.get(forms.emailField).click().type(faker.internet.email(), {delay: 100})
    cy.get(forms.maleRadioButton).click()
    cy.get(forms.phoneField).click().type(faker.phone.number('##########'), {delay: 100})
    cy.get(forms.birthField).click()
    cy.get(forms.datePickerMonthSelection).select('June')
    cy.get(forms.datePickerYearSelection).select('1994')
    cy.get(forms.myDateOfBirth).click()
    cy.get(forms.birthField).invoke('val').then(($text) => {
      expect($text).to.equal('27 Jun 1994')
    })
    cy.get(forms.subjectField).click()
      .type('English', {delay:100})
    cy.get(forms.subjectOption).click()
    cy.get(forms.subjectField).click()
      .type('Commerce', {delay: 100})
    cy.get(forms.subjectOption).click()
    cy.get(forms.subjectField).click()
      .type('Economics', {delay: 100})
      cy.get(forms.subjectOption).click()
    cy.get(forms.subjectValues).should('have.length', 3)
    cy.get(forms.subjectRemove).first().click()
    cy.get(forms.subjectValues).should('have.length', 2)
    cy.get(forms.removeAllSubjects).click()
    cy.get(forms.subjectValues).should('not.exist')
    cy.get(forms.sportsCheckbox).click()
    cy.get(forms.choosePicturebutton).click().selectFile('cypress/fixtures/randomPicture.jpg')
    cy.get(forms.currentAddressField).click().type(faker.location.streetAddress(), {delay: 100})
    cy.get(forms.stateDropdown).click()
    cy.get(forms.stateOptions).click()
    cy.get(forms.cityDropdown).click()
    cy.get(forms.cityOption).click()
    cy.get(forms.submitButton).click()

    cy.log('Check that the confirmation modal is opened')
    cy.get(forms.submitModalTitle).should('be.visible')
    cy.get(forms.submitModalTitle).should('have.text', 'Thanks for submitting the form')
    cy.get(forms.closeModalButton).scrollIntoView().click()
  })
})
