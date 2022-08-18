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

function read(supplier_id){
    return knex("suppliers")
        .select("*")
        .where({supplier_id})
        .first()
}

function update(updatedSupplier){
    return knex("suppliers")
        .select("*")
        .where({supplier_id: updatedSupplier.supplier_id})
        .update(updatedSupplier, "*")
        .then(
            (updatedRecords)=> updatedRecords[0]
        );
}


module.exports = {
    list,
    create,
    read, 
    update, 
}