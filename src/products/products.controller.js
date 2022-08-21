const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function list(req, res, next){
  productsService
    .list()
    .then((data)=> res.json({data}))
    .catch(next);
}
/* //productExists using promise .then .catch
function productExists(req, res, next) {
  productsService
    .read(req.params.productId)
    .then((product)=>{
      if(product){
        res.locals.product = product;
        return next();
      }
      next({
        status:404,
        message: `Product cannot be found`
      })
    })
    .catch(next);
}
*/
// productExists using async await
async function productExists(req, res, next){
  const product = await productsService.read(req.params.productId);
  if(product){
    res.locals.product = product;
    return next();
  }
  next({
    status:404, 
    message: `Product cannot be found`
  })
}

function read(req, res){
  const {product: data} = res.locals;
  res.json({data});
}

async function listOutOfStockCount(req, res, next){
  res.json({data: await productsService.listOutOfStockCount()})
}

async function priceSummary(req, res, next){
  res.json({data: await productsService.priceSummary()})
}

async function totalWeightByProduct(req, res, next){
  const result = await productsService.totalWeightByProduct();
  res.json({data: result});
}


module.exports = {
  list,
  read:[
    productExists,
    read,
  ], 
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  priceSummary: asyncErrorBoundary(priceSummary),
  totalWeightByProduct: asyncErrorBoundary(totalWeightByProduct),
};