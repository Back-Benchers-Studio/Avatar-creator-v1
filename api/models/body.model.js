const mongoose = require("mongoose");
const Schema = mongoose.Schema

const bodySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    }
    
},{ timestamps: true });
bodySchema.methods.toJSON = function () {
  const bodySchema = this.toObject();
  return bodySchema;
};
module.exports = mongoose.model("body", bodySchema);;


