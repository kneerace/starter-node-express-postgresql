const comments = require("../fixtures/comments.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE comments RESTART IDENTITY CASCADE")
    .then(() => knex("comments").insert(comments));
};
