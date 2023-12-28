require("dotenv").config();


function checkRoleForUser(req, res, next) {
  // if (res.locals.role !== process.env.USER ) res.sendStatus(401);
  // else next();
  if (res.locals.role !== "admin" ||  res.locals.role !== "user") res.sendStatus(401);
  else next();
}
  
module.exports = { checkRoleForUser: checkRoleForUser};
