const express = require('express')
const router = require('express-promise-router')()
const productController = require('../controllers/ProductController')


router.get('/', productController.getProduct)
router.post('/', productController.newProduct)

module.exports = router