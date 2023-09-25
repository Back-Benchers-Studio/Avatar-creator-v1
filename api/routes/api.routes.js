const express = require('express')
const router = express.Router()


const {
    UploadDrive,
} = require('../controllers/drive.controller')

router.post('/api/drive-upload', UploadDrive)

console.log("api.routes.js loaded")

module.exports = router