

import CalculatorInput from "../calculator-input/calculator-input.vue";
describe('CalculatorInput', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('displays the correct former value', () => {
        cy.get('.grid-calculator-display-former-value')
            .should('have.value', '0');
    });

    it('displays the correct current value', () => {
        cy.get('.grid-calculator-display-current-value')
            .should('have.value', '0');
    });

    it('displays the correct operator', () => {
        cy.get('.operator-slot-input')
            .should('have.value', '');
    });

    it('displays the exponential result if the value is greater than the limit', () => {
        cy.get('.grid-calculator-display-current-value')
            .should('have.value', '0');

        cy.get('.grid-calculator-display-current-value')
            .should('have.value', '1e+12');
    });
});

