import { MessageModel } from "inbucket-js-client";

describe("User Registration and Login", function () {
    before(() => {
        cy.resetDatabase();
    });

    it("User can register", () => {
        const email = "testuser1@example.com";
        const username = "testuser1";

        cy.task("reset_mailbox", email);

        cy.visit("/accounts/register");

        // Register a new user
        cy.get("input[name='username']").type(username);
        cy.get("input[name='email']").type(email);
        cy.get("input[name='password']").type("correctHorseBatteryStaple");
        cy.getBySel("register").click();

        // TODO: Check the status code of the response

        // Check that the user is told about the verification email
        cy.getBySel("message").should("contain", "verification email");

        // Check that the verification email is sent
        cy.task("get_latest_email", email).then((email: MessageModel) => {
            // expect(email.subject).to.contain("Verify your email address");
            expect(email.subject).to.contain("Confirm Your E-mail Address");
            expect(email.body.text).to.contain("register");
            return email.body.text.match(/http:\/\/\S+/)[0];
        }).then((confirmation_link) => {
            cy.visit(confirmation_link);
        });
    });

    it("User can login", () => {
        const email = "testuser2@example.com";
        const username = "testuser2";
        const password = "correctHorseBatteryStaple";

        cy.task("reset_mailbox", email);

        cy.register(username, email, password);

        cy.visit("/accounts/login");
        cy.get("input[name='username']").type(username);
        cy.get("input[name='password']").type(password);
        cy.getBySel("login").click();
    });

    // it("User can logout", () => {
    //
    // });
});