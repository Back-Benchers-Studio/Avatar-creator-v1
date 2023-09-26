const BodyModel = require('../models/body.model.js')
const ShoeModel = require('../models/shoe.model.js')
const FaceModel = require('../models/face.model.js')
const LegsModel = require('../models/legs.model.js')
const SkinModel = require('../models/skin.model.js')

const { google } = require("googleapis");
const fs = require('fs');
const path = require('path')


const SCOPES = ["https://www.googleapis.com/auth/drive"];

    const auth = new google.auth.GoogleAuth({
      credentials: {
        "type": "service_account",
        "project_id": "avatar-400116",
        "private_key_id": "b90c9e42fd0b9424c70872cc83315963d812dda9",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC2tFlBLFoJRHnJ\n+zjVJHDEPmFdZhFYHE6o36IrJ1gZ6iA8qmJmZlkJTz4uZ7Sf02TeGMQoAWaCBR/C\ni+wOlbaC7B7FjmkMTJBrNzDXwPYb8dM8jqIis8e8oN1kup9uFp12408fHQJSNiK4\nMzIrBq3Wf5frzsQgHhovBPExSGVtUL8vWJ3y56s+/Tgh4C5lK+RM+N1CH0O4Mtr+\nS+GntjH7daHP3FsEK0VnNgin+ohrpUDCjyMsWAtq7WUZEYeNPPoW8R2fRbofLj7v\nvq8lJPSbLMv00uoS3dT/VIc2dfEjZWhfOoiYaReB9JyDYLeeOiPPFOgQql+EzgVG\nH10qV50hAgMBAAECggEAGyaD2P6JRrVJT+2oTWxD4bXPbDy9uRVDzy6kf7syCW/U\naI99XfA5rPt8pxK8McANTj/p7nP+0rWGObfnVWeEHsKN9BesnqpGD9i8xmMjb5Wp\nKWecyoFi3jIdlFlzVb3Amqk+2cXK0YK/+BWLj/9HGAgQAHfSh19RzsjyOruibvL+\nv9+Mu7ca+d0kzvsY9IgFPXY/kCxQrO3QY4V88p7BhhkN3+Fy5uj8lt5qAuqb/62p\nxRmJ+Cmo8w+MEWsLlLIprMDTAZc3YaqUsYlq2ZGHjVxbtmz1XqFzZSlMUGI0Sg9t\nzdK8uTGWYx1BMr8NmX63Waep03fXAKZqAlBAXvP97QKBgQD+9PJHc2TNkETJUIYO\nioREpUkhpPQ40AzD6CYW2DBDWweM+8zH9LcF5RmVA31LkddN2HiglQK6XRBfzgsR\n+mzW3/akKHm4BaWyq493t5ztPLD6Q/5/QGtEYAeYlwXS8VVwi8RDFtXg/FhFJJAp\n1hF2oAQ47fehdMFkwzCWV7PHrwKBgQC3c7jIBUkEt9aro/VfImqX6gvCfWQ4Ad63\nFLs+EntIUY5+KIknObmal+A7xqUQNaFvTmnp+2oANJ9MMAALpb7pEnrw2C5RnkCy\n2egucDqWPJpwwN92ekMyXuGlbKp7Szm9fZj0als1WM1ovtTAIa5RpWDeyemkQ2AD\n7rmbtVJMLwKBgQCuM9lTHrJSjm+hieZ/CwADE1hbp6TDKMyAEx/rXf3kF8+Z8fZi\n7X8chQQsv/ydZOHSq8UIG6iIg8wLWfJQb2Zsjwyr74fzR9CGuxhE+W0838ogxdKf\nSfnA90hZZ18wWXtCcg1AtdqfZmw9mhTysPSvs/gOmfIoHGmDmqaZIwWQuwKBgQCy\nwrPbTLMjQtSPOlxeUJYX4/uDkFY48TGJq0ztpmq1RKuaKXvEWk6O4tGgzeeITQo7\nAOjaFJ/tBVn4jols0Byg1t4vlChGZfPbk9TYc4nTXciMeJUHyQlzqtssLCBPtjTU\nfe+us3ifGiJGoDWF5wwLCSDE13GxG+oSyuvYW66PBwKBgQCM0uBYQLKrS2zNAXfS\nfapOvtigNEP2bJeEVP2IyDkJMCNK23I0OAIB8rLwDg6Iilu+BhL6iWHZlLIB5Ge1\nAn7TfoGXCo3Zq8I5+4Yc5W0kdpVrIou1BFOP2oWSw7T4VJDEzOP2bYnWPT4WNjdn\nRO5TQU6ahGByPTtWJgQeCfwKWw==\n-----END PRIVATE KEY-----\n",
        "client_email": "d-86-969@avatar-400116.iam.gserviceaccount.com",
        "client_id": "114943987949463880997",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/d-86-969%40avatar-400116.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      },
      scopes: SCOPES,
    });
const drive = google.drive({ version: 'v3', auth });


exports.SaveModel = async (req, res) => {
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
              message: "Model published successfully!",
          })
        }).catch(err => {
          return res.status(500).send({
              message: err.message
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
                message: "Model published successfully!",
            })
          }).catch(err => {
            return res.status(500).send({
                message: err.message
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
              message: "Model published successfully!",
          })
        }).catch(err => {
          return res.status(500).send({
              message: err.message
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
              message: "Model published successfully!",
          })
        }).catch(err => {
          return res.status(500).send({
              message: err.message
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
              message: "Model published successfully!",
          })
        }).catch(err => {
          return res.status(500).send({
              message: err.message
          })
        })}else{
          return res.status(500).send({
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
      return res.status(500).send({
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
      return res.status(500).send({
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
      return res.status(500).send({
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
      return res.status(500).send({
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
    return res.status(500).send({
        message: err.message
    })
  })
    }else{
      return res.status(500).send({
        message: "Class not found"
    })
    }


}


exports.GetAllModelsOfClass = async (req, res) => {

    try{
        const AvaliableClasses = ['bodys','face','legs','shoe','skin'];
    
        // console.log(req.body.payload.classname)
        if(!(AvaliableClasses.includes(req.body.payload.classname)))
        {
            return res.status(400).send({
                error: true,
                message: "Class not found"
            });
        }
    
    
        const { data: ModelFolder } = await google
        ?.drive({ version: "v3", auth })
        ?.files?.list({
          q: `name = '${req.body.payload.classname}' and mimeType = 'application/vnd.google-apps.folder'`,
        });
    
        const classID = ModelFolder.files[0].id;
    
        const {data:Models} = await google?.drive({ version: "v3", auth })?.files?.list({
            q: `'${classID}' in parents and mimeType != 'application/vnd.google-apps.folder'`,
            fields: "files(name,id)",
            pageSize: 1000,
          });
    
          return res.status(200).send({
            error: false,
            "Models": Models.files
        });
    
        }catch(err){
            return res.status(500).send({
                error: true,
                message: err.message
            });
        }
    

}




exports.GetModelDataByID = async (req, res) => {
    try{
        fileId = req.body.payload.modelid;
        let data = [];
        drive.files.get(
          { fileId: fileId,
            alt: 'media' },
          { responseType: 'stream' }
        ).then(driveres => {
          driveres.data
            .on('end', () => {
                const buffer = Buffer.concat(data);
                const base64Data = buffer.toString('base64');
                return res.end(base64Data);
            })  
            .on('error', err => {
              return res.status(500).send({
                error: true,
                message: err.message
            });
            })  
            .on('data', d => {
                data.push(d);
            });  
        }); 
    }catch(err){
        return res.status(500).send({
            error: true,
            message: err.message
        });
    }

}

function removeExtension(filename){
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
}


// exports.GetModelDataByID = async (req, res) => {
//     const filePath = '/tmp/xzd.glb';

//     fs.readFile(filePath,{encoding: 'base64'}, (err, data) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error reading file');
//       } else {
//         res.end(data);
//       }
//     });

// }