import {
  LOGIN_PASSWD_INPUT,
  LOGIN_USERNAME_INPUT,
  VALID_USERNAME,
  VALID_PASSWORD
} from "../support/selectors/login_selectors";

describe('Testing the Sign-in/Sign-up page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should see Sign In, Sign Up, Hello, Friend! at first', () => {
    cy.contains('Hello, Friend!');
    cy.contains('Sign in');
    cy.contains('Sign up');
  });

  function validLogin() {
    cy.get(LOGIN_USERNAME_INPUT).type(VALID_USERNAME);
    cy.get(LOGIN_PASSWD_INPUT).type(VALID_PASSWORD);
    cy.get('#signIn').click();
  }

  it('should login in the app and see the success message & contacts page', () => {
    validLogin();
    cy.contains('Success!');
    cy.contains('Logged in.');
    cy.contains('Contacts');
  });
});
