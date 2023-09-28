const BodyModel = require('../models/body.model.js')
const ShoeModel = require('../models/shoe.model.js')
const FaceModel = require('../models/face.model.js')
const LegsModel = require('../models/legs.model.js')
const SkinModel = require('../models/skin.model.js')
const passcodeModel = require('../models/passcodes.model.js')

const fs = require('fs');
const path = require('path')

exports.SaveModel = async (req, res) => {
    if(!req.body.payload.passcode){
      return res.status(200).send({
        error: true,
        message: "No Passcode provided",
    })
    }

    let passcodeMongo = await passcodeModel.findOne({passcode:req.body.payload.passcode});
    if(!passcodeMongo){
      return res.status(200).send({
        error:true,
        message: "Passcode not found",
    })
    }
      if(!(req.body.payload.name.endsWith('.glb')||req.body.payload.name.endsWith('.gltf'))){
        return res.status(200).send({
          error:true,
          message: "File extension not supported",
      })
      }
      let filePath = '';
      filePath = path.join(__dirname,"..","..","public","models",req.body.payload.type,req.body.payload.name);
      let base64Data = req.body.payload.file.replace(/^data:application\/octet-stream;base64,/, "");
      fs.writeFile(filePath, base64Data, 'base64', function(err) {

      });    
      if(req.body.payload.type == 'face'){
        const facemodel = new FaceModel({
          name: removeExtension(req.body.payload.name),
          model: `models/${req.body.payload.type}/${req.body.payload.name}`,
          skin: req.body.payload.skin
        })
        facemodel.save().then(data => {
          return res.status(200).send({
          error:false,
              message: "Model published successfully!",
          })
        }).catch(err => {
          return res.status(200).send({
            error:true,
              message: err.code===11000?"Duplicated Entity": err.message
          })
        })
      }else
        if(req.body.payload.type == 'bodys'){
          const bodymodel = new BodyModel({
            name: removeExtension(req.body.payload.name),
            model: `models/${req.body.payload.type}/${req.body.payload.name}`,
          })
          bodymodel.save().then(data => {
            return res.status(200).send({
              error:false,
                message: "Model published successfully!",
            })
          }).catch(err => {
            return res.status(200).send({
              error:true,
                message: err.code===11000?"Duplicated Entity": err.message
            })
          })
      } else
      if(req.body.payload.type == 'legs'){
        const legsmodel = new LegsModel({
          name: removeExtension(req.body.payload.name),
          model: `models/${req.body.payload.type}/${req.body.payload.name}`,
        })
        legsmodel.save().then(data => {
          return res.status(200).send({
            error:false,
              message: "Model published successfully!",
          })
        }).catch(err => {
          return res.status(200).send({
            error:true,
              message: err.code===11000?"Duplicated Entity": err.message
          })
        })
      } else
      if(req.body.payload.type == 'shoe'){
        const shoemodel = new ShoeModel({
          name: removeExtension(req.body.payload.name),
          model: `models/${req.body.payload.type}/${req.body.payload.name}`,
        })
        shoemodel.save().then(data => {
          return res.status(200).send({
            error:false,
              message: "Model published successfully!",
          })
        }).catch(err => {
          return res.status(200).send({
            error:true,
              message: err.code===11000?"Duplicated Entity": err.message
          })
        })
      } else 
      if(req.body.payload.type == 'skin'){
        const skinModel = new SkinModel({
          name: removeExtension(req.body.payload.name),
          model: `models/${req.body.payload.type}/${req.body.payload.name}`,
        })
        skinModel.save().then(data => {
          return res.status(200).send({
            error:false,
              message: "Model published successfully!",
          })
        }).catch(err => {
          return res.status(200).send({
            error:true,
              message: err.code===11000?"Duplicated Entity": err.message
          })
        })}else{
          return res.status(200).send({
            error:true,
            message: "Error happened while saving to database"
        })
        }
}

exports.getAllDataOfClass = async (req, res) => {
  if(req.body.payload.classname == 'face'){
    FaceModel.find({}).then(data => {
      return res.status(200).send({
          message: "Faces fetched successfully!",
          data: data
      })
    }).catch(err => {
      return res.status(200).send({
          message: err.message
      })
    })
  }else if(req.body.payload.classname == 'bodys'){
    BodyModel.find({}).then(data => {
      return res.status(200).send({
          message: "Bodys fetched successfully!",
          data: data
      })
    }).catch(err => {
      return res.status(200).send({
          message: err.message
      })
    })
  }else if(req.body.payload.classname == 'legs'){
    LegsModel.find({}).then(data => {
      return res.status(200).send({
          message: "Legs fetched successfully!",
          data: data
      })
    }).catch(err => {
      return res.status(200).send({
          message: err.message
      })
    })
  }else if(req.body.payload.classname == 'shoe'){
    ShoeModel.find({}).then(data => {
      return res.status(200).send({
          message: "Shoes fetched successfully!",
          data: data
      })
    }).catch(err => {
      return res.status(200).send({
        message: err.message
      })
    })
  }else if(req.body.payload.classname == 'skin')
    {
  SkinModel.find({}).then(data => {
    return res.status(200).send({
        message: "Skins fetched successfully!",
        data: data
    })
  }).catch(err => {
    return res.status(200).send({
        message: err.message
    })
  })
    }else{
      return res.status(200).send({
        message: "Class not found"
    })
    }


}

function removeExtension(filename){
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
}