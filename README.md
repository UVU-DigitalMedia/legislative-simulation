# Express API boilerplate

# Required Software

Up-to-date versions of the following software is needed for the software to work
properly.

* [`git`](http://git-scm.com/) - Source control software
* [`node`](http://nodejs.org/) - Environment
* [`npm`](https://docs.npmjs.com/) - Third party dependency management
* [`mongodb`](http://www.mongodb.org/) - The database

You will also need a [github](https://github.com/) account.

# Installation and Setup

<!-- TODO need to complete instructions -->
This assumes that you have the above software already installed an up-to-date.

1. Fork the
  [repository](https://github.com/UVU-DigitalMedia/legislative-simulation) from
  github into your own user account.

2. Clone your fork onto your own computer:
  ```bash
  # clones the repo
  git clone git@github.com:[your-user-name]/legislative-simulation.git
  # moves you to the project directory
  cd legislative-simulation
  ```

3. Set up your upstream remote point (so you can update your code before
  submitting pull requests):
  ```bash
  # sets up another remote point for your setup
  git remote add upstream git@github.com:UVU-DigitalMedia/legislative-simulation.git
  ```

4. Install the `npm` dependencies
  ```bash
  npm install
  ```

5. Make sure your database is running
  ```bash
  # this runs the mongodb shell.
  mongo
  >
  ```
  If it exits with `exception: connect failed`, then you need to open up a new
  tab and run:
  ```bash
  mongod
  ```
  If that fails, then you need to figure out why you can't run mongod. Make sure
  that you've installed mongodb in the first place, check for permissions on
  the database file/folder it's trying to write to, and google the issue if that
  persists. Avoid running with `sudo`.

6. Seed the Database TODO instructions

7. Set up your local configuration TODO instructions

8. Set up the dev ssl certificates TODO instructions

9. Run the tests to make sure everything is working TODO instructions

10. Start the app TODO instructions


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
