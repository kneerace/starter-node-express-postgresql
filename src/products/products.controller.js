const productsService = require("./products.service");

function list(req, res, next){
  productsService
    .list()
    .then((data)=> res.json({data}))
    .catch(next);
}

function read(req, res, next) {
  res.json({ data: { product_title: "some product title" } });
}


module.exports = {
  list,
  read, 
};