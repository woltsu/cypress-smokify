# cypress-smokify
A [Cypress](https://www.cypress.io/) plugin that automatically generates smoke-like tests from a project's cypress test base. By providing the percentage of tests to skip, `cypress-smokify` will file-specifically pick arbitrary tests to run.

## Install
1. Install the package
```bash
npm install cypress-smokify
```

2. Add it into `cypress/plugins/index.js`
```js
const smokify = require('cypress-smokify')

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', smokify(config))
}
```

3. Specify the % (value between 0-1) of tests you want to skip
```bash
cypress run --env smokify=0.5 --config baseUrl=http://X:Y/ 
```
