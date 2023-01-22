describe("CalculatorNumbers", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("displays the correct value when a number button is clicked", () => {
        cy.get("button[data-type='number']").contains('2').first().click();
        cy.get("input[class='grid-calculator-display-current-value']")
            .should("have.value", "2");
    });

    it("displays the correct operator when an operator button is clicked", () => {
        cy.get("button[data-type='number']").contains('2').first().click();
        cy.get("button[data-type='operator']").contains('+').first().click();
        cy.get("input[class='operator-slot-input']")
            .should("have.value", "+");
    });

    it("should reset calculator when deletion is clicked", () => {
        cy.get("button[class='grid-button grid-actions']").contains('AC').first().click();
        cy.get('.grid-calculator-display-current-value')
            .should('have.value', '0');
    });

    it("should update current value while typing if is number", () => {
        cy.get("button[data-type='number']").contains('2').first().click();
        cy.get("button[data-type='number']").contains('2').first().click();
        cy.get("button[data-type='number']").contains('3').first().click();

        cy.get('.grid-calculator-display-current-value')
            .should('have.value', '223');
    });

    it("should update former value  while typing if is operator", () => {
        cy.get("button[data-type='number']").contains('2').first().click();
        cy.get("button[data-type='number']").contains('2').first().click();
        cy.get("button[data-type='number']").contains('3').first().click();
        cy.get("button[data-type='operator']").contains('+').first().click();

        cy.get('.grid-calculator-display-current-value')
            .should('have.value', '0');

        cy.get('.grid-calculator-display-former-value')
            .should('have.value', '223');
    });
})