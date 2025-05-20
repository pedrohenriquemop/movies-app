import AppBreadcrumb from "@/components/AppBreadcrumb/app-breadcrumb";
import { mockedSegments } from "./mocks";

describe("AppBreadcrumb", () => {
  describe("breadcrumb with multiple segments", () => {
    beforeEach(() => {
      cy.mount(<AppBreadcrumb pathSegments={mockedSegments} />);
    });

    it("renders breadcrumb links correctly", () => {
      cy.get("a").should("have.length", 2);
      cy.contains("Home").should("have.attr", "href", "/");
      cy.contains("Movies").should("have.attr", "href", "/movies");
    });

    it("final segment is not a link", () => {
      cy.contains("The Matrix").should("exist").and("not.have.attr", "href");
    });

    it("has x-1 separators for x segments", () => {
      cy.get("[data-testid='breadcrumb-separator']").should(
        "have.length",
        mockedSegments.length - 1,
      );
    });
  });

  describe("breadcrumb with a single segment", () => {
    beforeEach(() => {
      cy.mount(<AppBreadcrumb pathSegments={mockedSegments.slice(0, 1)} />);
    });

    it("renders a single segment without links", () => {
      cy.contains("Home").should("exist").and("not.have.attr", "href");
    });

    it("renders a single segment without separators", () => {
      cy.get("a").should("not.exist");
      cy.get("[role='separator'], [data-testid='breadcrumb-separator']").should(
        "not.exist",
      );
    });
  });
});
