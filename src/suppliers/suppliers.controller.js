const supplierService = require("./suppliers.service");

const VALID_PROPERTIES =[
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];

function hasOnlyValidProperties(req, res, next){
  const{data={}} = req.body;
  const invalidFields = Object.keys(data).filter(
    (field)=>!VALID_PROPERTIES.includes(field));

  if(invalidFields.length){
    return next({
      status:400, 
      message:`Invalid fields(s): ${invalidFields.join(", ")}`
    });
  }
  next();
}

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
