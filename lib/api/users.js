"use strict";

let Joi = require("joi");
let User = require("../models/user");
let bcrypt = require("bcryptjs");
let Boom = require("boom");

let routes = [];
const validation = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
};

routes.push({
  method: "POST",
  path: "/api/users/login",
  config: {
    handler: (request, reply) => {
      User.forge({
          email: request.payload.email
        })
        .fetch()
        .then((model) => {
          let password = request.payload.password;
          if (model.isValidPass(password)) {
            return reply({
              statusCode: 200,
              message: "Authenticated",
              data: model
            });
          }
          return reply(Boom.unauthorized("Incorrect Email/Password."));
        })
        .catch((err) => {
          return reply(Boom.badRequest(err));
        })
    }
  }

});

module.exports = routes;
