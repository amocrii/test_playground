# **test_playground**

## **Table of Contents**
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Additional Resources](#additional-resources)

### **Introduction**

This project uses Cypress for end-to-end (E2E) testing. Cypress is a fast, easy, and reliable testing tool for anything that runs in a browser.  

### **Prerequisites**

Before you begin, ensure you have installed the following tools on your machine:
- Node.js(>= 20.x)
- npm(>= 9.x) or yarn (>= 1.x)
- Git

### **Installation**

To set up the project locally, follow these steps:
1. Clone the repository:
    git clone https://github.com/amocrii/test_playground.git  
2. Install the dependencies:  
    `npm install`
    # or
    `yarn install`

### **Running Tests**

To run the tests, use the following commands:
* Run the tests in interactive (headed) mode:  
    `npx cypress open`
* Run the tests in headless mode:  
    `npx cypress run`

**Note 1:** In order to run a specific test file, the user has to use the `--spec` argument as it follows:  
    `npx cypress run --spec ".\cypress\e2e\uitestingplayground\responsive.cy.js"`  
**Note 2:** When the tests run in headless mode, the default used browser will be Electron. In order to select the desired browser, the user ahs to use the `--browser` argument as it follows:  
    `npx cypress run --browser=chrome`
### **Reporting**

**IMPORTANT!**
The reports are generated only when the test scenarios are executed in headless mode.

After a headless test execution is finished, the report can be found under the `reports` folder  

### **Additional Resources**

* [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress)