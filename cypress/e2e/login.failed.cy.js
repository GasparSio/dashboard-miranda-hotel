describe("Login", () => {
    it("If login success then navigates to dashboard", () => {
      cy.visit("localhost:3000");
      cy.url().should("include", "/login");
      cy.get('input[placeholder="Username"]')
        .type("gas1")
        .should("have.value", "gas");
      cy.get('input[placeholder="Email"]')
        .type("sio1")
        .should("have.value", "sio");
      cy.contains("Submit").click();
  
      cy.url().should("include", "/home/dashboard");
    });
  });