export class FormsSection {

    //locators
    formsGroup = '.element-group'
    formsListMenu = '[test-data="Forms"] .element-list'
    practiceFormButton = '[test-data="Forms"] .element-list [id="item-0"]'
    firstNameField = '#firstName'
    lastNameField = '#lastName'
    emailField = '#userEmail'
    maleRadioButton = '[for="gender-radio-1"]'
    phoneField = '#userNumber'
    birthField = '#dateOfBirthInput'
    datePickerMonthSelection = '.react-datepicker__month-select'
    datePickerYearSelection = '.react-datepicker__year-select'
    myDateOfBirth = '.react-datepicker__day--027'
    subjectField = '.subjects-auto-complete__value-container'
    subjectOption = '#react-select-2-option-0'
    subjectValues = '.subjects-auto-complete__multi-value'
    subjectRemove = '.subjects-auto-complete__multi-value__remove'
    removeAllSubjects = '.subjects-auto-complete__clear-indicator' 
    sportsCheckbox = '[for="hobbies-checkbox-1"]'
    choosePicturebutton = '#uploadPicture'
    currentAddressField = '#currentAddress'
    stateDropdown = '#state'
    stateOptions = '#react-select-3-option-0'
    cityDropdown = '#city'
    cityOption = '#react-select-4-option-0'
    submitButton = '#submit'
    submitModalTitle = '.modal-title'
    closeModalButton = '#closeLargeModal'
}