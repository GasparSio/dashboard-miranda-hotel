describe("Login", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("If login success then navigates to dashboard", () => {
    cy.url().should("include", "/login");
    cy.get('[data-cy=username-input]')
      .type("gas")
      .should("have.value", "gas");
      cy.get('[data-cy=email-input]')
      .type("sio")
      .should("have.value", "sio");
    cy.contains("Submit").click();

    cy.url().should("include", "/home/dashboard");
  });

  it('It displays error message and stays on login when login fails', () => {
    cy.url().should('include', '/login');
    cy.get('input[placeholder="Username"]').type("wrongUsername");
    cy.get('input[placeholder="Email"]').type("wrongEmail");
    cy.contains("Submit").click();
    cy.contains("Wrong Username or Email").should("be.visible");
    cy.url().should("include", "login");
  });
});
