"use strict";

let Hapi = require("hapi");
let Config = require("getconfig");
let Good = require("good");
let Minimist = require("minimist");
let Vision = require("vision");
let Inert = require("inert");
let Jade = require("jade");
let api = require("./lib/api");
let authPlugin = require("./lib/authentication");
let routes = require("./lib/routes");
let serverConfig = {};
let server = new Hapi.Server(serverConfig);

let argv = Minimist(process.argv.slice(2), {
  boolean: ['help'],
  default: {
    host: 'localhost',
    port: 3000
  }
});

if (argv.help) {
  console.log('node index.js --host=localhost --port=3000');
  process.exit(0);
}

server.connection({
  host: argv.host,
  port: argv.port
});

let plugins = [];
plugins.push({
  register: Good,
  options: {
    reporters: [{
      reporter: require("good-console"),
      events: {
        // Move to good-file
        response: "*",
        log: "*"
      }
    }]
  }
});

plugins.push({
  register: Vision
});

plugins.push({
  register: Inert
});

plugins.push({
  register: authPlugin
});

plugins.push({
  register: api
});

server.register(plugins, err => {
  if (err) {
    throw err;
  }
});


server.route(routes);

server.views({
  engines: {
    jade: Jade
  },
  relativeTo: __dirname,
  path: "./templates",
  context: {
    site: Config.site
  }
});

server.start(() => {
  console.info(`Server running at: ${server.info.uri}`);
});
