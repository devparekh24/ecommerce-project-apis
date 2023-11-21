const mongoose = require('mongoose');
const { isEmpty } = require('validator/lib/isEmpty')
const productTypeSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Product must has its Category'],
        unique: true,
        min: [1, 'Category cannot be empty']
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true
})

const ProductType = mongoose.model('ProductType', productTypeSchema)
module.exports = ProductType