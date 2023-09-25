const mongoose = require("mongoose");
const Schema = mongoose.Schema

const skinSchema = new Schema({
    name: {
        type: String,
        required: true
    },    
    UID: {
        type: String,
        required: true
    }
    
},{ timestamps: true });
skinSchema.methods.toJSON = function () {
  const skinSchema = this.toObject();
  return skinSchema;
};
module.exports = mongoose.model("skin", skinSchema);;
