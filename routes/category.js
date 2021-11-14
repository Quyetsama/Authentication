const express = require('express')
const router = require('express-promise-router')()
const categoryController = require('../controllers/CategoryController')


router.get('/', categoryController.index)
router.post('/', categoryController.newCategory)

module.exports = router