const mongoose = require("mongoose");
const Schema = mongoose.Schema

const shoeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    model:{
        type: String,
        required: true,
        unique: true,
    }
    
},{ timestamps: true });
shoeSchema.methods.toJSON = function () {
  const shoeSchema = this.toObject();
  return shoeSchema;
};
module.exports = mongoose.model("shoe", shoeSchema);;
