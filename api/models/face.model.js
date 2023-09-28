const mongoose = require("mongoose");
const Schema = mongoose.Schema

const faceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    skin:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true,
        unique: true,
    }
    
},{ timestamps: true });
faceSchema.methods.toJSON = function () {
  const faceSchema = this.toObject();
  return faceSchema;
};
module.exports = mongoose.model("face", faceSchema);;
