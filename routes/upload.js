const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/UploadController')

router.get('/', uploadController.index)

module.exports = router