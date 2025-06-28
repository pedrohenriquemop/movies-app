import { MOCK_VALID_USER } from "../fixtures/mockData";

describe("Authentication E2E Tests", () => {
  beforeEach(() => {
    cy.clearAuth();
    cy.visit("/");
  });

  it("allows a user to log in successfully", () => {
    cy.mockLoginSuccess();

    cy.get('[data-testid="login-register-button"]').click();

    cy.get('input[type="email"]').type(MOCK_VALID_USER.email);
    cy.get('input[type="password"]').type("testpassword123");

    cy.get("button[data-testid='auth-login-button']").click();

    cy.wait("@loginRequest").its("request.body").should("deep.include", {
      email: MOCK_VALID_USER.email,
      password: "testpassword123",
    });
    cy.wait("@getUserByIdRequest").its("response.statusCode").should("eq", 200);
  });

  it("shows error on incorrect login credentials", () => {
    cy.mockLoginFailure();

    cy.get('[data-testid="login-register-button"]').click();

    cy.get('input[type="email"]').type("wrong@example.com");
    cy.get('input[type="password"]').type("wrongpassword");
    cy.get("button[data-testid='auth-login-button']").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  });
});
