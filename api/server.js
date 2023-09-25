require("dotenv").config();
require("./mongodb.js");
var bodyParser = require('body-parser')

const express = require("express");
const app = express();
const port = process.env.PORT || 8080; 

var cors = require('cors');
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

const visitorRoutes = require('./routes/api.routes')
app.use(visitorRoutes)

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
