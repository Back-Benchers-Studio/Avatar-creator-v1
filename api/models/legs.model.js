const mongoose = require("mongoose");
const Schema = mongoose.Schema

const legsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    }
    
},{ timestamps: true });
legsSchema.methods.toJSON = function () {
  const legsSchema = this.toObject();
  return legsSchema;
};
module.exports = mongoose.model("legs", legsSchema);;
