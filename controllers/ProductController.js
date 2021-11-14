const Product = require('../models/Product')
const Category = require('../models/Category')


class ProductController {
    // index = async (req, res, next) => {
    //     const categories = await Category.find({})
    //     return res.status(200).json({ categories })
    // }

    newProduct = async (req, res, next) => {
        const category = await Category.findById(req.body.category)

        const newProduct = new Product(req.body)
        await newProduct.save()

        category.products.push(newProduct._id)
        await category.save()

        return res.status(201).json({ product: newProduct })
    }

    getProduct = async (req, res, next) => {
        const products = await Product.find({ 'category': req.query.category })

        return res.status(200).json({ products })
    }
}

module.exports = new ProductController