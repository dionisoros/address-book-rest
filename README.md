# Address-book-rest app
Address book restful api with a simple CRUD and authentification using json web token.

## Tech stack at a glance
[Koa](https://koajs.com/) for exposing data over REST endpoints  
[Angular](https://angular.io/) framework for client side

# Installation 

## System Requirements
|   |   |   |
|---|---|---|
| node |  .>= 10.x [Node.js](https://nodejs.org/en/) (check with command <b>node -v</b>)
| npm |   .>= 6.13.0 (check with command <b>npm -v</b>)
| ng | npm install -g @angular/cli (check with command <b>ng --version</b>)

## Install project (development mode)

### Client
```bash
cd address-book-client
npm install
ng serve
```

### Server
```bash
cd address-book-server
npm install
npm run dev      
```
----
### Open the client side (Angular9):
Open a browser tab and type <b>localhost:4200</b>  
Sing up a new user or <b>log in with this user credentials: 

|   |   |   |
|---|---|---|
| username |  usernametest
| password |  password

----
## Client side (Angular 9) in-depth:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io/).

### Running end-to-end tests with Cypress

Run `npm run cypress:run` or `npm run e2e` to execute Cypress.io tests via [Cypress.io](https://www.cypress.io/) -> open Cypress test runner (Electron-based)

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
