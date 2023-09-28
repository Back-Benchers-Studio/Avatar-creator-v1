const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://metachronical:Nz8eP3FU2Fqo9S5X@cluster0.bbxyuhe.mongodb.net/Avatar?retryWrites=true&w=majority&appName=AtlasApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successed"))
  .catch((err) => console.log("connection falid with Error: ", err));

