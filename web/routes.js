"use strict";

let routes = [];

routes.push({
  path: "/",
  method: "GET",
  config: {
    handler: function (request, reply) {
      return reply.view("index");
    }
  }
});

module.exports = routes;
