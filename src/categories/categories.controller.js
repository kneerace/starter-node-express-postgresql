const categoriesService = require("./categories.service");

/*
//list using promise .then .catch
function list(req, res, next) {
  categoriesService
    .list()
    .then((data)=> res.json({data}))
    .catch(next);
}
*/

//list using async await 
async function list(req, rest){
  try{
  const data = await categoriesService.list();
  rest.json({data})
}
catch(error){
  next(error);
}
}

module.exports = {
  list,
};
