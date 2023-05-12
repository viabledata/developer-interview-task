# UI
Viable Data Tech Task Sample App


## Requirements

* node v18

## Index
* [Getting started](#getting-started)
* [Run locally](#run-locally)
* [Run with Docker and NGINX](#run-with-docker-and-nginx)
* [Run Cypress tests](#run-cypress-tests)

## Form Creator
<a href="link here>How to create a new form component and a form</a>

----

### Getting started

**1. Clone this repo**

----

### Run locally
**2. Install package dependencies**
```sh
npm install
```
**3. Build development bundle** *(optional)*
```sh
npm run build:dev
```
**4. Start the application** *(optional)*
```sh
npm start
```
----

### Run with Docker and NGINX
**2. Build the application Docker container**
```sh
docker build -t this-app .
```
**3. Run the resulting Docker container**
```sh
docker run -d --name this-app -p 8080:8080 this-app .
```

----

### Run Cypress tests
**Run all the tests on local environment - replace below command with actual mailslurp API key** *(It executes tests headless mode on Electron Browser)*
```sh
npm run cypress:run:local -- --env MAIL_API_KEY=<API_KEY> .
```
**Run tests on cypress runner on local environment - replace below command with actual mailslurp API key**
```sh
npm run cypress:open:local -- --env MAIL_API_KEY=<API_KEY> .
```
**Run all the tests on development environment - replace below command with actual mailslurp API key** *(It executes tests headless mode on Electron Browser)*
```sh
npm run cypress:run:dev -- --env MAIL_API_KEY=<API_KEY> .
```
**Run tests on cypress runner on a specific browser on development environment - replace below command with actual mailslurp API key**
```sh
npm run cypress:open:dev -- --env MAIL_API_KEY=<API_KEY> .
```
**Run regression pack**
```sh
npm run cypress:run:dev -- --env MAIL_API_KEY=<API_KEY>,TAGS='@regression' .
```
