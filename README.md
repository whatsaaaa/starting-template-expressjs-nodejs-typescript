<h1 align="center">Expressjs/Nodejs/TypeScript Starting Template</h1>

<p align="center">
  <b>Starting template to build a Node.js RESTful API Service with code written in TypeScript</b></br>
  <span>Inspired by the awesome boilerplate <a href="https://github.com/w3tecch/express-typescript-boilerplate">w3rec</a></br>
  <sub>Made by <a href="https://github.com/whatsaaaa">@whatsaaaa</a>
</p>

<br />

## > Getting Started

### 1. Prerequsits

Install [Node.js and NPM](https://nodejs.org/)

Install [Yarn](https://yarnpkg.com/)

Install [MySQL database](https://www.mysql.com/)

> If you want a different database, it is possible to change it later.

### 2. Start new Project

Download this repository on your machine. Configure package.json (change author, project name, project description etc.)

After that copy the `.env.example` file and rename it to just `.env`. In this file add your configuration informations such as database connection information.

Now you are ready to setup your application.

```bash
yarn run setup
```

> This command will install all dependencies with yarn. After that it will migrate the database and seed some test data into it. When this command is completed your application is ready to use.

### 3. Serve your App

To start your application locally run next yarn script.

```bash
yarn start serve
```

> This will start a local server using `nodemon`, which will watch for any file changes and will restart the server.

## > Scripts

All scripts are defined in the `package-scripts.js` file. Here we will list the most important and most used ones.

### Install

- Install all dependencies with `yarn install`.

### Linting

- Run code quality analysis using `yarn start lint`.

### Tests

### Run application in dev mode

- Run `yarn start serve` to start nodemon with ts-node, to serve the app.

### Building the project and run

- Run `yarn start build` to generate all JavaScript files from the TypeScript sources.
- To start the builded app located in `dist` folder, use `yarn start`

### Database Migration

- Run `typeorm migration:create -n <migration-file-name>` to create a new migration file.
- Migrate your database by running `yarn start db.migrate` command
- Revert your latest migration run `yarn start db.revert`
- Drop database chema `yarn start db.drop`

### Database Seeding

- Run `yarn start db.seed` to seed your seeds into the database

## > Features

- [TypeDI](https://github.com/pleerock/typedi)
- [TypeORM](https://github.com/typeorm/typeorm)
- [routing-controllers](https://github.com/pleerock/routing-controllers)
- [class-validator](https://github.com/pleerock/class-validator)
- [Helmet](https://helmetjs.github.io/)
