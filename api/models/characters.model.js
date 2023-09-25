const mongoose = require("mongoose");
const Schema = mongoose.Schema

const characterSchema = new Schema({
    face: {
        skin:String,
        name:String,
        model:String,
        
    },    
    body: {
        name:String,
        model:String,
        
    },
    legs: {
        name:String,
        model:String,
        
    },
    shoe: {
        name:String,
        model:String,
        
    },
    skin: {
        name:String,
        model:String,
       
    },

},{ timestamps: true });
characterSchema.methods.toJSON = function () {
  const characterSchema = this.toObject();
  return characterSchema;
};
module.exports = mongoose.model("character", characterSchema);;

