require("dotenv").config();
require("./mongodb.js");
const visitorRoutes = require('./routes/api.routes')
const express = require("express");
const app = express();
const port = process.env.PORT || 8080; 


app.listen(port, () => {
  console.log("Server is up on port " + port);
});
