const supplierService = require("./suppliers.service");

function list(req, res, next){
  return supplierService
          .list()
          .then((data)=> res.json({data}))
          .catch(next);
}
async function create(req, res, next) {
  res.status(201).json({ data: { supplier_name: "new supplier" } });
}

async function update(req, res, next) {
  res.json({ data: { supplier_name: "updated supplier" } });
}

async function destroy(req, res, next) {
  res.sendStatus(204);
}

module.exports = {
  list,
  create,
  update,
  delete: destroy,
};
