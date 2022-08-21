const knex = require("../db/connection");

const tableName = "comments";

function list() {
  // your solution here
  return knex(tableName)
        .select("*");
}

function listCommenterCount() {
  // your solution here
}

function read(commentId) {
  // your solution here
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
