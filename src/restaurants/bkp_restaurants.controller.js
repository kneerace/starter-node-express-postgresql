const restaurantsService = require("./restaurants.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties")

const hasRequiredProperties = hasProperties("restaurant_name", "cuisine", "address"
);

// const VALID_PROPERTIES = ['restaurant_name', 'cuisine', 'address',];

function hasOnlyValidProperties(req, res, next){
  const {data ={}} = req.body;
  console.log("hasOnlyValidProperties:::req.body:::", data);
  console.log("Object.keys(data)::: ", Object.keys(data))
  const invalidProperties = Object.keys(data).filter(
    (field)=>!VALID_PROPERTIES.includes(field));
  
//   const invalidFields = Object.keys(data).filter(
    // (field)=>!VALID_PROPERTIES.includes(field));

  console.log("hasOnlyValidProperties::: ", invalidProperties)
  if(invalidProperties.length){
    return next({
      status: 400, 
      message:`not_supported`, 
    });
  }
  next();
};

function bodyDataHasValue(propertyId){
//   console.log("bodyDataHasValue::: ", propertyId)
  return function (req, res, next){
    const {data ={}}= req.body;
    if(data[propertyId]){
      return next()
    }
    next({
      status:400,
      message:`Restaurant must include '${propertyId}'.`
    })
  }
}

async function restaurantExists(req, res, next) {
  const { restaurantId } = req.params;

  const restaurant = await restaurantsService.read(restaurantId);

  if (restaurant) {
    res.locals.restaurant = restaurant;
    return next();
  }
  next({ status: 404, message: `Restaurant cannot be found.` });
}

async function list(req, res, next) {
  const data = await restaurantsService.list();
  res.json({ data });
}

 function create(req, res, next) {
  // Your solution here
  restaurantsService
    .create(req.body.data)
    .then((data)=> res.status(201).json({data}))
    .catch(next);
}

async function update(req, res, next) {
  const updatedRestaurant = {
    ...res.locals.restaurant,
    ...req.body.data,
    restaurant_id: res.locals.restaurant.restaurant_id,
  };

  const data = await restaurantsService.update(updatedRestaurant);

  res.json({ data });
}

async function destroy(req, res, next) {
  // your solution here
  restaurantsService
    .delete(res.locals.restaurant.restaurant_id)
    .then(()=> res.sendStatus(204))
    .catch(next)
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(bodyDataHasValue("restaurant_name")),
    asyncErrorBoundary(bodyDataHasValue("cuisine")),
    asyncErrorBoundary(bodyDataHasValue("address")),
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(restaurantExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(restaurantExists), asyncErrorBoundary(destroy)],
};