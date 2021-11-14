const mongoose = require('mongoose')


const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        name: {
            type: String
        },

        price: {
            type: Number,
            // validate: {
            //     validator: Number.isInteger,
            //     message: '{Price} is not an integer value'
            // }
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    },
    
    {
        collection: 'products',
        versionKey: false
    }
)

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product