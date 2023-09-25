const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://backbenchersteam23:cZMciniOgAaEU45q@cluster0.q4aihf4.mongodb.net/Avatar?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successed"))
  .catch((err) => console.log("connection falid with Error: ", err));

