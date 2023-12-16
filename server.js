require("dotenv").config();
const http = require("http");
const app = require("./index");
const server = http.createServer(app);
//console.log(process.env.PORT);
server.listen(process.env.PORT);
