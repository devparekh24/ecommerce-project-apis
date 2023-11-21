const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product must has a title'],
        unique: true

    },
    description: {
        type: String,
        required: [true, 'Product must has a description']
    },
    price: {
        type: Number,
        required: [true, 'Product must has a price']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'ProductType',
        required: true
    },
    thumbnail: {
        type: String,
        required: [true, 'Product must has a thumbnail']
    },
    discountPercentage: {
        type: Number
    },
    rating: {
        type: Number
    },
    stock: {
        type: Number
    },
    brand: {
        type: String
    },
    images: {
        type: [String]
    }
}, {
    toJSON: true,
    toObject: true,
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product;