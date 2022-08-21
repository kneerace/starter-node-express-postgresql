const users = require("../fixtures/users.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(() => knex("users").insert(users));
};
