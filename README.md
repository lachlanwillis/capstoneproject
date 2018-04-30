# capstoneproject
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

THENKS!
