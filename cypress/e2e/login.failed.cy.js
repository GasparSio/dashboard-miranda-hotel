describe('Login', () => {
    it('It displays error message and stays on login when login fails', () => {
        cy.visit("localhost:3000");
        cy.url().should('include', '/login');
        cy.get('input[placeholder="Username"]').type("wrongUsername");
        cy.get('input[placeholder="Email"]').type("wrongEmail");
        cy.contains("Submit").click();
        cy.contains("Wrong Username or Email").should("be.visible");
        cy.url().should("include", "login");
    })
})