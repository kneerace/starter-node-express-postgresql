const posts = require("../fixtures/posts.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE posts RESTART IDENTITY CASCADE")
    .then(() => knex("posts").insert(posts));
};
