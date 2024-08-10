export class ElementsSection {

    //locators
    elementsGroup = '.element-group'
    elementsListMenu = '[test-data="Elements"] .element-list'
    textBoxButton = '[test-data="Elements"] .element-list [id="item-0"]'
    checkBoxButton = '[test-data="Elements"] .element-list [id="item-1"]'
    radioButton = '[test-data="Elements"] .element-list [id="item-2"]'
    webTable = '[test-data="Elements"] .element-list [id="item-3"]'
    contentAreaTitle = 'h1.text-center'
    textBoxOutput = '#output'
    usernameField = '#userName'
    emailField = '#userEmail'
    currentAddressField = '#currentAddress'
    permanentAddressField = '#permanentAddress'
    submitButton = '#submit'
    outputName = '#output #name'
    outputEmail = '#output #email'
    outputCurrentAddress = '#output #currentAddress'
    outputPermanentAddress = '#output #permanentAddress'
    homeTreeCheckbox = '[for="tree-node-home"] .rct-checkbox .rct-icon'
    expandAllButton = '[title="Expand all"]'
    checkboxes = '.rct-checkbox .rct-icon'
    angularNodeCheckbox = '[for="tree-node-angular"] .rct-checkbox .rct-icon'
    workspaceNodeCheckbox = '[for="tree-node-workspace"] .rct-checkbox .rct-icon'
    documentsNodeCheckbox = '[for="tree-node-documents"] .rct-checkbox .rct-icon'
    downloadsNodeCheckbox = '[for="tree-node-downloads"] .rct-checkbox .rct-icon'
    parentNodes = '.rct-node-parent'
    downloadsChildNodes = '[test-data="Downloads"].rct-node-parent ol .rct-checkbox .rct-icon'
    yesRadioButton = '#yesRadio'
    impressiveRadioButton = '#impressiveRadio'
    noRadioButton = '#noRadio'
    radioButtonResponse = ".mt-3"
    yesRadioButtonLabel = '[for="yesRadio"]'
    impressiveRadioButtonLabel = '[for="impressiveRadio"]'
    noRadioButtonLabel = '[for="noRadio"]'
    tableRows = '.rt-tbody [role="row"]'
    rowsPerPage = '[aria-label="rows per page"]'
    tableSearchbox = '#searchBox'
    tableCell = '.rt-td'
    newEntryButton = '#addNewRecordButton'
    registrationForm = '.modal-content'
    firstNameField = '#firstName'
    lastNameField = '#lastName'
    ageField = '#age'
    salaryField = '#salary'
    departmentField = '#department'

    filledRowsNumber(expectedNumber) {
        cy.get(this.tableRows).then(($rows) => {
            const filledRows = $rows.filter((index, row) =>  !Cypress.$(row).hasClass('-padRow'))
            expect(filledRows.length).to.equal(expectedNumber)
          })
    }
}