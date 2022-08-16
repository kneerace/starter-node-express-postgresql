const env = process.env.NODE_ENV || "development";
const config = requiure("../../knexfile")[env];
const knex = require("knex")(config);

module.exports = knex;
