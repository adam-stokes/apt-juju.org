"use strict";

let bs = require("../db");
let bcrypt = require("bcryptjs");

let User = bs.model('User', {
  tableName: 'users',
  scope() {
    return this.belongsTo('Scope');
  },
  hidden: ['password'],
  encryptPass(pwd) {
    let hash = bcrypt.hashSync(pwd, 10);
    this.set('password', hash);
  },
  isValidPass(pwd) {
    let hash = this.get('password');
    return bcrypt.compareSync(pwd, hash);
  }
});

module.exports = User;
