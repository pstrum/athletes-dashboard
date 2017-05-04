## Athletes Dashboard
A dashboard that displays Strava user data.

### Getting Started
This repo was created using Node v7.5.0.

1. First, check if you have Yarn installed (`yarn --version`). If you do not:
```
brew install yarn
```
Then, run `yarn` to install all project dependencies.

2. Run `npm run dev` to start the development server and head over to `http://localhost:8080/` in your browser to see the dashboard.

3. This repo includes GitHub pages integration, so to incorparate that functionality make the appropriate changes in the package.json and then run `npm run deploy` to push to a gh-pages branch.

4. Run `webpack -p` for default webpack production build before deploying.
