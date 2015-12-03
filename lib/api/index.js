"use strict";
let UserRoutes = require("./users");


let api = {
  register: (server, options, next) => {
    server.route(UserRoutes);
  }
};

api.register.attributes = {
  name: 'apiPlugin'
};

module.exports = api;
