const knex = require("../db/connection");

function list(){
    return knex("suppliers").select("*");
}

function create(supplier){
    return knex("suppliers") // table suppliers
        .insert(supplier) // insert statement 
        .returning("*") // returns an array of records inserted
        .then(
            (createdRecords)=> createdRecords[0]
            // only one record is inserted at a time so chaining the insert query
            );
}

module.exports = {
    list,
    create,


}