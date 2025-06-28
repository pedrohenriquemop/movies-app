import { MOCK_VALID_USER } from "../fixtures/mockData";

describe("Profile Page E2E Tests (Logged In)", () => {
  beforeEach(() => {
    cy.clearAuth();
    cy.visit("/");

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

    cy.get('[data-testid="profile-sidebar-item"]').click();
  });

  it("displays user profile information", () => {
    cy.get("p").contains(MOCK_VALID_USER.username).should("be.visible");
    cy.get("p").contains(MOCK_VALID_USER.email).should("be.visible");
    cy.get("p")
      .contains(MOCK_VALID_USER.bio || "No bio yet.")
      .should("be.visible");
  });
});
