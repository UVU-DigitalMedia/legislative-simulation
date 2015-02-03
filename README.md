# Express API boilerplate.

# Required Software

Up-to-date versions of the following software is needed for the software to work
properly.

* [`git`](http://git-scm.com/) - Source control software
* [`node`](http://nodejs.org/) - Environment
* [`npm`](https://docs.npmjs.com/) - Third party dependency management
* [`PostgreSQL`](http://www.postgresql.org/) - The database

# Installation and Setup

<!-- TODO need to complete instructions -->

```bash
# clone the repository
git clone git://github.com:UVU-DigitalMedia/legislative-simulation.git
cd express-api
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

## Main commands

These are the commands to run lots of things at once, and probably the most used
commands.

* `npm start` - Starts the application. Runs `node app.js`.

* `npm run watch` - Starts the application, and will watch for application file
  file changes and automatically restarts the application.

* `npm test` - Runs the automated tests. You should have the database running
  and have the required test database set up. Be sure to check your
  configuration.

* `npm run docs` - Generates the documentation in the `docs/` directory.

* `npm run jshint` - Runs all .js files through `jshint`. Rules are defined in
  [`.jshintrc`](.jshintrc). Also gets run during the normal `npm test`.
  Avoid changing the rules to fix jshint errors.

## Sub commands

These commands are mostly just used by the above commands, but can be used
separately from them if needed.

* `npm run testcov` - Runs the tests with test coverage reports. Also gets run
  during the normal `npm test` command. Note that test coverage does not
  report stability of the api. It strictly tells you how many lines of code have
  been run. Use test coverage to find out where you can simplify things.

* `npm run testcovcheck` - Checks the coverage levels to make sure they are
  within the threshold. The tests should have been run with test coverage before
  this works. e.g. `npm run testcov; npm run testcovcheck;`. This automatically
  gets run with `npm test`.

* `npm run jsdoc` - Runs all of the project files through
  [jsdoc](http://usejsdoc.org/). This automatically runs with `npm run docs`.

* `npm run apidoc` - Runs all of the route files through
  [apidoc](http://apidocjs.com/). This automatically runs with `npm run docs`.
