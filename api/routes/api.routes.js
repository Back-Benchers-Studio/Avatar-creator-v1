const express = require('express')
const router = express.Router()

const {
    SaveModel,
    getAllDataOfClass

} = require('../controllers/models.controller')

const{
    PublishCharacter,
    GetCharacterByID,
} = require('../controllers/character.controller')

router.post('/api/savemodel', SaveModel)
router.post('/api/publishcharacter', PublishCharacter)
router.post('/api/character/', GetCharacterByID)
router.post('/api/getclass/', getAllDataOfClass)




module.exports = router