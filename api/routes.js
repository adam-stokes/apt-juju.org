"use strict";

let routes = [];

routes.push({
  path: "/",
  method: "GET",
  config: {
    handler: function (request, reply) {
      return reply({
        "statusCode": 200,
        "message": "Api backend"
      });
    }
  }
});

module.exports = routes;
