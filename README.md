# Legislative Simulation

This is a training program.

# Required Software

Up-to-date versions of the following software is needed for the software to work
properly.

* [`git`](http://git-scm.com/) - Source control software
* [`node`](http://nodejs.org/) - Environment
* [`npm`](https://docs.npmjs.com/) - Third party dependency management
* [`mongodb`](http://www.mongodb.org/) - The database

You will also need a [github](https://github.com/) account.

# Installation and Setup

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

5. Make sure your database is running (You don't need to do anything for this yet)
  ```bash
  # this runs the mongodb shell.
  mongo
  >
  # Press ctrl+c to quit the mongo shell if it connects successfully
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

6. Seed the Database (You don't need to do anything for this yet)

7. Start the app
  ```bash
  npm start
  ```
  
OR

  ```bash
  nodemon server.js
  ```
