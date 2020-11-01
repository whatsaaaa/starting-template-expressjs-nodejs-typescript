const { series, rimraf } = require("nps-utils");

module.exports = {
  scripts: {
    default: "nps start",
    start: {
      script: "cross-env NODE_ENV=production node dist/app.js",
      description: "Starts the builded application in production mode",
    },
    serve: {
      script: series("nps terminal.serve", "nodemon --watch src --watch .env"),
      description: "Serves the app and watches for changes",
    },
    setup: {
      script: series("yarn install", "nps db.setup"),
      description:
        "Setup the development environment. Does yarn install and DB setup",
    },
    config: {
      script: series(run("./commands/tsconfig.ts")),
      hiddenFromHelp: true,
    },
    build: {
      script: series(
        "nps terminal.build",
        "nps config",
        "nps lint",
        "nps clean.dist",
        "nps transpile",
        "nps copy",
        "nps copy.tmp",
        "nps clean.tmp"
      ),
      description: "Builds the app into the dist directort",
    },
    lint: {
      script: tslint("./src/**/*.ts"),
      hiddenFromHelp: true,
      description: "Runs TSLint",
    },
    transpile: {
      script: "tsc --project ./tsconfig.build.json",
      hiddenFromHelp: true,
    },
    clean: {
      default: {
        script: series(`nps banner.clean`, `nps clean.dist`),
        description: "Deletes the ./dist folder",
      },
      dist: {
        script: rimraf("./dist"),
        hiddenFromHelp: true,
      },
      tmp: {
        script: rimraf("./.tmp"),
        hiddenFromHelp: true,
      },
    },
    copy: {
      default: {
        script: series(`nps copy.public`),
        hiddenFromHelp: true,
      },
      public: {
        script: copy("./src/public/*", "./dist"),
        hiddenFromHelp: true,
      },
      tmp: {
        script: copyDir("./.tmp/src", "./dist"),
        hiddenFromHelp: true,
      },
    },
    db: {
      migrate: {
        script: series(
          "nps terminal.migrate",
          "nps config",
          run("./node_modules/typeorm/cli.js migration:run")
        ),
        description: "Migrates the database",
      },
      revert: {
        script: series(
          "nps terminal.revert",
          "nps config",
          run("./node_modules/typeorm/cli.js migration:revert")
        ),
        description: "Downgrades the database",
      },
      seed: {
        script: series(
          "nps terminal.seed",
          "nps config",
          run("./commands/seed.ts")
        ),
        description: "Seeds records into the database",
      },
      drop: {
        script: run("./node_modules/typeorm/cli.js schema:drop"),
        description: "Drops the schema of the database",
      },
      setup: {
        script: series("nps db.drop", "nps db.migrate", "nps db.seed"),
        description: "Recreates the database with seeded data",
      },
    },
    terminal: {
      build: terminal("build"),
      serve: terminal("serve"),
      migrate: terminal("migrate"),
      seed: terminal("seed"),
      revert: terminal("revert"),
      clean: terminal("clean"),
    },
  },
};

function terminal(name) {
  return {
    hiddenFromHelp: true,
    silent: true,
    description: `Shows ${name} to the console`,
    script: run(`./commands/terminal.ts ${name}`),
  };
}

function copy(source, target) {
  return `copyfiles --up 1 ${source} ${target}`;
}

function copyDir(source, target) {
  return `ncp ${source} ${target}`;
}

function run(path) {
  return `ts-node --transpile-only ${path}`;
}

function tslint(path) {
  return `tslint -c ./tslint.json ${path} --format stylish`;
}
