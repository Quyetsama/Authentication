const Category = require('../models/Category')


class CategoryController {
    index = async (req, res, next) => {
        const categories = await Category.find({}, {_id: 1, name: 1})
        return res.status(200).json({ categories })
    }

    newCategory = async (req, res, next) => {
        const newCategory = new Category(req.body)
        await newCategory.save()
        return res.status(201).json({ category: newCategory })
    }
}

module.exports = new CategoryController