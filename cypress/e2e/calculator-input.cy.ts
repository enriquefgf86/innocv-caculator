export { }

describe('CalculatorInput', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('displays the correct former value', () => {
        cy.get('.grid-calculator-display-former-value')
            .should('have.value', '0');
    });

    it('displays the correct current value', () => {
        cy.get('.grid-calculator-display-current-value')
            .should('have.value', '');
    });

    it('displays the correct operator', () => {
        cy.get('.operator-slot-input')
            .should('have.value', '');
    });


});

