const knex = require("../db/connection");

function list(){
    return knex("products").select("*");
}

function read(productId){
    return knex("products").select("*")
        .where({product_id : productId})
        .first(); // returns first row in the table as an object
}

function listOutOfStockCount(){
    return knex("products")
        .select("product_quantity_in_stock as out_of_stock")
        .count("product_id")
        .where({product_quantity_in_stock: 0})
        .groupBy("out_of_stock");
}

function priceSummary(){
    return knex("products")
        .select("supplier_id")
        .min("product_price")
        .max("product_price")
        .avg("product_price")
        .groupBy("supplier_id")
        .orderBy("supplier_id");
}

function totalWeightByProduct(){
    return knex("products")
        .select("product_sku", "product_title",
            knex.raw("sum(product_quantity_in_stock * product_weight_in_lbs) as total_weight")
        )
        .groupBy("product_title", "product_sku")
        // .first()
        ;
}

module.exports={
    list,
    read,
    listOutOfStockCount,
    priceSummary,
    totalWeightByProduct,
}