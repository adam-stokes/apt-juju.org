"use strict";

let Config = require("getconfig");

let authPlugin = {
  register: (server, options, next) => {
    server.register(require("hapi-auth-bearer-token"), (err) => {
      if (err) {
        throw err;
      }

      server.auth.strategy('simple', 'bearer-access-token', {
        validateFunc: (token, callback) => {
          // TODO: Add user scope
          if (token === Config.api_key) {
            callback(null, true, {
              scope: 'admin'
            });
          } else {
            callback(null, false, {});
          }
        }
      });
    });

    next();
  }
};

authPlugin.register.attributes = {
  name: 'authPlugin',
  version: "1.0.0"
};

module.exports = authPlugin;
