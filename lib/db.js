"use strict";

let Config = require("getconfig");
let Knex = require("knex");
let Bookshelf = require("bookshelf");

// postgres://postgres@127.0.0.1:5432/postgres

let pg = Knex({
  client: "pg",
  connection: Config.dsn,
  pool: {
    min: 0,
    max: 7
  }
});

let bs = Bookshelf(pg);
bs.plugin('registry');
bs.plugin('visibility');
bs.plugin('virtuals');

module.exports = bs;
