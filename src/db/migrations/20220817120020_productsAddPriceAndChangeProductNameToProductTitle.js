/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("products", (table)=> {
    table.renameColumn("product_name", "product_title"); // existing column update
    table.decimal("product_price"); // new column add
});
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
        return knex.schema.table("products",(table)=> {
            table.renameColumn("product_title", "product_name");
            table.dropColumn("product_price");
        });
};
