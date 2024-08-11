/// <reference types="Cypress" />
import { Homepage } from "../../support/pageObject/demoqa/homepage";
import { ElementsSection } from "../../support/pageObject/demoqa/elements";
import { faker } from '@faker-js/faker';

const homepage = new Homepage();
const elements = new ElementsSection();

describe('Elements Tests', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent Cypress from failing the test
      return false;
    });

    cy.log('Navigate to the page...')
    cy.visit('https://demoqa.com');
    cy.log('Go to Elements page')
    cy.get(homepage.cardText).contains('Elements').click()
    cy.url().should('include', '/elements')

    cy.log('Check that the Elements section is collapsed')
    // workaround used to get an unique element
    cy.get(elements.elementsGroup).first()
      .invoke('attr', 'test-data', 'Elements')
    cy.get(elements.elementsListMenu).should('have.class', 'show')
  })

  it('Interact with Text Box elements', () => {

    cy.log('Select the Text Box')
    cy.get(elements.textBoxButton).click()

    cy.log('Check if the Text Box option is selected')
    cy.get(elements.textBoxButton).should('have.class', 'active')
    cy.get(elements.contentAreaTitle).should('have.text', 'Text Box')

    cy.log('Check that the output is not visible')
    cy.get(elements.textBoxOutput).should('not.be.visible')

    cy.log('Check that the output is not visible if the user submits the textbox without filling anything')
    cy.get(elements.submitButton).click()
    cy.get(elements.textBoxOutput).should('not.be.visible')

    cy.log('Check that the output is not visible if user submits the text box using an email addres with a wrong format')
    cy.get(elements.emailField).click().type('1234', {delay: 100})
    cy.get(elements.textBoxOutput).should('not.be.visible')

    cy.log('Fill the entire text box and check that the output has the same text')
    cy.get(elements.usernameField).click().type(faker.person.fullName(), {delay: 100})
    cy.get(elements.emailField).click().clear().type(faker.internet.email(), {delay: 100})
    cy.get(elements.currentAddressField).click().type(faker.location.streetAddress(), {delay: 100})
    cy.get(elements.permanentAddressField).click().type(faker.location.streetAddress(), {delay: 100})
    cy.get(elements.submitButton).click()
    cy.get(elements.textBoxOutput).should('be.visible')
    cy.get(elements.usernameField).invoke('val').then(inputValue => {
      cy.get(elements.outputName).invoke('text').then(outputValue => {
        expect(outputValue).to.equal(`Name:${inputValue}`)
      })
    })
    cy.get(elements.emailField).invoke('val').then(inputValue => {
      cy.get(elements.outputEmail).invoke('text').then(outputValue => {
        expect(outputValue).to.equal(`Email:${inputValue}`)
      })
    })
    cy.get(elements.currentAddressField).invoke('val').then(inputValue => {
      cy.get(elements.outputCurrentAddress).invoke('text').then(outputValue => {
        expect(outputValue.trim()).to.equal(`Current Address :${inputValue}`)
      })
    })
    cy.get(elements.permanentAddressField).invoke('val').then(inputValue => {
      cy.get(elements.outputPermanentAddress).invoke('text').then(outputValue => {
        expect(outputValue).to.equal(`Permananet Address :${inputValue}`)
      })
    })
  })

  it('Interact with Check Box elements', () => {

    cy.log('Select the Check Box')
    cy.get(elements.checkBoxButton).click()

    cy.log('Check if the Check Box option is selected')
    cy.get(elements.checkBoxButton).should('have.class', 'active')
    cy.get(elements.contentAreaTitle).should('have.text', 'Check Box')

    cy.log('Check that the root checkbox is unchecked')
    cy.get(elements.homeTreeCheckbox).should('have.class', 'rct-icon-uncheck')

    cy.log('Check the root checkbox')
    cy.get(elements.homeTreeCheckbox).click()
    cy.get(elements.homeTreeCheckbox).should('have.class', 'rct-icon-check')

    cy.log('Check that all the nodes are checked when the root checkbox is checked')
    cy.get(elements.expandAllButton).click()
    cy.get(elements.checkboxes).each(($checkbox) => {
      cy.wrap($checkbox).should('have.class', 'rct-icon-check')
    })

    cy.log('Uncheck one node from last level and see that its superior nodes have the minus symbol')
    cy.get(elements.angularNodeCheckbox).click()
    cy.get(elements.angularNodeCheckbox).should('have.class', 'rct-icon-uncheck')
    cy.get(elements.workspaceNodeCheckbox).should('have.class', 'rct-icon-half-check')
    cy.get(elements.documentsNodeCheckbox).should('have.class', 'rct-icon-half-check')
    cy.get(elements.homeTreeCheckbox).should('have.class', 'rct-icon-half-check')

    cy.log('Verify that unchecking a node, leads to its child nodes to be unchecked as well')
    cy.get(elements.downloadsNodeCheckbox).click()
    cy.get(elements.parentNodes).last()
      .invoke('attr', 'test-data', 'Downloads')
    cy.get(elements.downloadsChildNodes).each(($childNode) => {
      cy.wrap($childNode).should('have.class', 'rct-icon-uncheck')
    })
  })

  it('Interact with Radio Button elements', () => { 
    cy.log('Select the Radio Button')
    cy.get(elements.radioButton).click()

    cy.log('Check if the Radio Button option is selected')
    cy.get(elements.radioButton).should('have.class', 'active')
    cy.get(elements.radioButton).should('have.text', 'Radio Button')

    cy.log('Check the state of each radio button')
    cy.get(elements.yesRadioButton).should('be.enabled')
    cy.get(elements.impressiveRadioButton).should('be.enabled')
    cy.get(elements.noRadioButton).should('be.disabled')

    cy.log('Verify that the right text is displayed when you select Yes button')
    cy.get(elements.yesRadioButtonLabel).click()
    cy.get(elements.radioButtonResponse).should('have.text', 'You have selected Yes')

    cy.log('Verify that the right text is displayed when you select Impressive button')
    cy.get(elements.impressiveRadioButtonLabel).click()
    cy.get(elements.radioButtonResponse).should('have.text', 'You have selected Impressive')

    cy.log('Verify that the No button cannot be selected')
    cy.get(elements.noRadioButtonLabel).click({force: true})
    cy.get(elements.noRadioButton).should('not.be.checked')
  })

  it('Interact with Web Tables', () => {
    cy.log('Select the Web Table')
    cy.get(elements.webTable).click()

    cy.log('Check if the Web Tables option is selected')
    cy.get(elements.webTable).should('have.class', 'active')
    cy.get(elements.webTable).should('have.text', 'Web Tables')

    cy.log('Check that the table has initially 3 filled rows')
    elements.filledRowsNumber(3)

    cy.log('Check that the default rows per page is 10 and that there are 10 rows displayed in the tabls')
    cy.get(elements.rowsPerPage)
      .find(':selected')
      .invoke('text')
      .then((text) => {
        const displayedRows = parseInt(text, 10)

        cy.get(elements.tableRows)
          .its('length')
          .then((rowCount) => {
            expect(rowCount).to.equal(displayedRows)
          })
      })

    cy.log('Check that the search works as expected')
    cy.get(elements.tableSearchbox).click().type('2000', {delay: 100})
    cy.get(elements.tableRows).each(($row) => {
      cy.wrap($row).find(elements.tableCell).then(($cells) => {
        const isRowEmpty = $cells.toArray().every((cell) => cell.textContent.trim() === '');
        if (!isRowEmpty) {
          cy.wrap($row).find(`${elements.tableCell}:nth-child(5)`).should('contain.text', 2000);
        }
      })
    })
    cy.get(elements.tableSearchbox).clear()

    cy.log('Verify that the user can add a new row')
    cy.get(elements.newEntryButton).click()
    cy.get(elements.registrationForm).should('be.visible')
    cy.get(elements.firstNameField).click().type(faker.person.firstName(), {delay: 100})
    cy.get(elements.lastNameField).click().type(faker.person.lastName(), {delay: 100})
    cy.get(elements.emailField).click().type(faker.internet.email(), {delay: 100})
    cy.get(elements.ageField).click().type(faker.datatype.number({ min: 18, max: 65}))
    cy.get(elements.salaryField).click().type(faker.datatype.number({min: 2000, max: 15000}))
    cy.get(elements.departmentField).click().type(faker.commerce.department())
    cy.get(elements.submitButton).click()
    elements.filledRowsNumber(4)
  })
})
