# capstoneproject

## Deploying the App

0. Ensure you have all the requirements installed and the build prepared. If you're deploying to a service like DigitalOcean, they have one click installs for docker. You will need `docker` and `docker-compose` installed on your computer.

    If you're running the build locally, jump straight to step 2.

    After `docker` and `docker-compose` have installed, open the `docker/docker-compose.yml` file in your favourite text editor and fill in the required details.

    These details are the domain that you're deploying to, the details for the facebook and google applications, as well as the details for the email used to send verification emails.


    If you've decided to change the `docker-compose.yml` file, you'll need to ensure that you have the latest LTS version of Node.js installed. This can be found [here](https://nodejs.org/en/)

1. If you've changed the `docker-compose.yml` file, run the `create-build.sh` script. This will create a directory called `build`. 

2. Run the `start-build.sh` script. This will navigate to the build directory and issue the command `docker-compose up`

3. That's it! The application is now running on the port specified in the `docker-compose.yml` file, probably `8080`.

4. (Optional) Set up a reverse proxy and enable https.

## THE FOLLOWING INSTRUCTIONS ARE FOR DEVELOPMENT

## Requirements

- Node
- NPM
- Angular CLI (ng) (`npm install -g @angular/cli`)
- Typescript (tsc)
- MongoDB

## Installing the App
To install the application, go to each directory that contains a section of the app and issue the command:
```
npm install
```
Currently these directories are `backend` and `apps/rubbish`

## Starting The App
To start the app, you have to start the backend and start the Angular app.
First navigate to backend and issue the command:
```
npm start
```
After starting the backend, go to the `apps/rubbish` directory and issue the same command:
```
npm start
```
Unlike the backend, the frontend Angular app will update with changes that you make to files, you won't need to start the server again. If you want the same effect on the backend, you'll have to run the command:
```
npm run start:watch
```
Note: You need to have `nodemon` installed to do this.

## Testing
To test, run the command:
```
npm test
```
Note: Currently the tests pass no matter what. TODO: Tests.

## Contributing
We should follow the [Git Flow methodology](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

## Creating a new component
1. Create a new component using the Angular CLI.
```
ng generate component <component-name>
OR
ng g c <component-name>
```
2. Add a route for that component in the `app.module.ts` file
```typescript
const routes: Route = [
    { path: '<your-url>', component: 'your-component' }
]
```
3. You can also add a link inside the nav component if you want
```html
<a routerLink="/your-url">Your Component</a>
```

4. Edit the HTML and CSS inside of your component folder and prosper.

