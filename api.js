"use strict";

let Hapi = require("hapi");
let Config = require("getconfig");
let Good = require("good");
let Minimist = require("minimist");
let api = require("./api");
let authPlugin = require("./api/authentication");
let serverConfig = {};
let server = new Hapi.Server(serverConfig);

let argv = Minimist(process.argv.slice(2), {
  boolean: ['help'],
  default: {
    host: 'localhost',
    port: 3001
  }
});

if (argv.help) {
  console.log('node index.js --host=localhost --port=3001');
  process.exit(0);
}

server.connection({
  host: Config.api.host,
  port: Config.api.port
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

server.start(() => {
  console.info(`Server running at: ${server.info.uri}`);
});
