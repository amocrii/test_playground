/// <reference types="Cypress" />
import { PlaygoundHome } from "../../support/pageObject/uitestingplayground/homepage";

const home = new PlaygoundHome();

describe('Responsive Image Test', () => {
  const viewports = [
    { width: 320, height: 568 },  // Mobile
    { width: 768, height: 1024 }, // Tablet
    { width: 1024, height: 768 }, // Landscape Tablet
    { width: 1280, height: 800 }, // Desktop
  ];

  viewports.forEach(viewport => {
    it(`should display the image correctly at ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit('http://uitestingplayground.com/'); 

      cy.log('Check if different elements are visible no matter the screen size')
      cy.get(home.title).should('be.visible')
      cy.get(home.warningMessage).should('be.visible')
      cy.get(home.cubePicture).should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
          expect($img[0].naturalHeight).to.be.greaterThan(0);
        });
      cy.get(home.sections).should('be.visible')
        .and(($section) => {
          expect($section).to.have.length(20)
        })
    });
  });
});