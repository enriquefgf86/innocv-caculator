export { }
describe('Calculator', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should display the calculator buttons', () => {
        cy.get('.grid-number-buttons-container')
            .find('button')
            .should('have.length', 20)
    })

    it('should update the current value when a number is clicked', () => {
        cy.get('button[data-type="number"]').contains('1')
            .first()
            .click()
        cy.get("input[class='grid-calculator-display-current-value number-slot']")
            .should('have.value', '1')
    })


    it('should reset the calculator when the AC button is clicked', () => {
        cy.get('button[data-type="number"]')
            .first()
            .click()
        cy.get('button[class="grid-button grid-actions cy-selector"]').scrollIntoView()
            .click({ force: true })
        cy.get("input[class='grid-calculator-display-current-value number-slot']")
            .should('have.value', 0)
    })

    it("should update current value while typing if is number", () => {
        cy.get("button[data-type='number']").contains('2').first().click();
        cy.get("button[data-type='number']").contains('2').first().click();
        cy.get("button[data-type='number']").contains('3').first().click();

        cy.get("input[class='grid-calculator-display-current-value number-slot']").should('have.value', '223');
    });

    it('should display an error message when dividing by zero', () => {
        cy.get('button[data-type="number"]').contains('1')
            .first()
            .click()
        cy.get('button[data-type="operator"]')
            .eq(1)
            .click()
        cy.get('button[data-type="number"]')
            .eq(9)
            .click()
        cy.get('button[class="grid-button grid-symbols equal-button"]')
            .click()
        cy.get('input[class="grid-calculator-display-former-value"]')
            .should('be.visible')
    })
})