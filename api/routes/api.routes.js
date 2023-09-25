const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {
    SaveModel,
    GetAllModelsOfClass,
    GetModelDataByID,

} = require('../controllers/drive.controller')

const{
    PublishCharacter,
    GetCharacterByID,
} = require('../controllers/character.controller')


// router.post('/api/savemodel', SaveModel)
router.post('/api/getclassmodels', GetAllModelsOfClass)
router.post('/api/getmodel', GetModelDataByID)
router.post('/api/publishcharacter', PublishCharacter)
router.post('/api/character/', GetCharacterByID)



module.exports = router