const mongoose = require("mongoose");
const Schema = mongoose.Schema

const passcodeSchema = new Schema({
    passcode: {
        type: String,
        required: true,
        unique: true,
    }
    
},{ timestamps: true });
passcodeSchema.methods.toJSON = function () {
  const passcodeSchema = this.toObject();
  return passcodeSchema;
};
module.exports = mongoose.model("passcode", passcodeSchema);;


