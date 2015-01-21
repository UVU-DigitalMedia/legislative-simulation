# Express API boilerplate

# Required Software

Up-to-date versions of the following software is needed for the software to work
properly.

* [`git`](http://git-scm.com/) - Source control software
* [`node`](http://nodejs.org/) - Environment
* [`npm`](https://docs.npmjs.com/) - Third party dependency management
* [`PostgreSQL`](http://www.postgresql.org/) - The database
* [`Redis`](http://redis.io/) - Key/Value database used for authentication codes

# Installation and Setup

<!-- TODO need to complete instructions -->

```bash
# clone the repository
git clone https://github.com/ksmithut/express-api.git
# install the dependencies
npm install
# TODO instructions: make sure the database is running
# TODO instructions: create the database/test database
# TODO instructions: seed the database
# TODO instructions: set up the configuration
# TODO instructions: set up the dev ssl certificates
# TODO instructions: set up your hosts file
# TODO instructions: run the tests
# TODO instructions: start the app
```

# Available commands

* `npm start` - Starts the application. Runs `node app.js`.

* `npm run watch` - Starts the application, and will watch for application file
  file changes and automatically restarts the application.

* `npm run test` - Runs the automated tests. You should have the database
  running and have the required test database set up. Be sure to check your
  configuration.

* `npm run testcov` - Runs the tests with test coverage reports. Also gets run
  during the normal `npm run test` command. Note that test coverage does not
  report stability of the api. It strictly tells you how many lines of code have
  been run. Use test coverage to find out where you can simplify things.

* `npm run jshint` - Runs all .js files through `jshint`. Rules are defined in
  [`.jshintrc`](.jshintrc). Also gets run during the normal `npm run test`.
  Avoid changing the rules to fix jshint errors.


