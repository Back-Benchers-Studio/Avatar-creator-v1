const CharacterModel = require('../models/characters.model')

exports.PublishCharacter = (req, res) => {
    const charactermodel = new CharacterModel({
        face: req.body.payload.face,
        body: req.body.payload.body,
        legs: req.body.payload.legs,
        shoe: req.body.payload.shoe,
        skin: req.body.payload.skin,
    })
    charactermodel.save().then(data => {
        res.status(200).send({
            message: "Character published successfully!",
            link: data._id
            
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.GetCharacterByID = (req, res) => {

    CharacterModel.findById(req.body.payload.id).then(data => {
        res.status(200).send({
            message: "Character fetched successfully!",
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}