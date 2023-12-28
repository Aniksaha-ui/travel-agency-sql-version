require("dotenv").config();

function checkRole(req, res, next) {
  // if (res.locals.role !== process.env.USER ) res.sendStatus(401);
  // else next();
  if (res.locals.role !== "admin" ) res.sendStatus(401);
  else next();
}

function checkRoleForUser(req, res, next) {
  // if (res.locals.role !== process.env.USER ) res.sendStatus(401);
  // else next();
  if (res.locals.role === "admin" ||  res.locals.role === "user") next();
  else res.sendStatus(401);
}


  
module.exports = { checkRole: checkRole,checkRoleForUser:checkRoleForUser };
