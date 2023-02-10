import { MessageModel } from "inbucket-js-client";

describe("User Registration and Login", function () {
    beforeEach(() => {
        cy.resetDatabase();
        cy.task("reset_mailbox", "testuser@example.com");
    });

    it("User can register", () => {
        cy.visit("/accounts/register");

        // Register a new user
        cy.get("input[name='username']").type("testuser");
        cy.get("input[name='email']").type("testuser@example.com");
        cy.get("input[name='password']").type("correctHorseBatteryStaple");
        cy.getBySel("register").click();

        // TODO: Check the status code of the response

        // Check that the user is told about the verification email
        cy.getBySel("message").should("contain", "verification email");

        // Check that the verification email is sent
        cy.task("get_latest_email", "testuser@example.com").then((email: MessageModel) => {
            // expect(email.subject).to.contain("Verify your email address");
            expect(email.subject).to.contain("Confirm Your E-mail Address");
            expect(email.body.text).to.contain("register");
            return email.body.text.match(/http:\/\/\S+/)[0];
        }).then((confirmation_link) => {
            cy.visit(confirmation_link);
        });
    });

    it("User can login", () => {

    });

    it("User can logout", () => {

    });
});