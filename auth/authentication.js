require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  //console.log(authHeader, "okkkk");
  const token = authHeader && authHeader.split(" ")[1];
  //console.log(token, "token");
  if (token == null)
    return res.send({ isExecute: false, message: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, response) => {
    if (error) return res.send({ isExecute: false, message: error });
    res.locals = response;
    next();
  });
}

module.exports = { authenticationToken: authenticationToken };
