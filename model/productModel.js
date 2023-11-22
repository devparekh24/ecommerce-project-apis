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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true
    },
    thumbnail: {
        type: String,
        required: [true, 'Product must has a thumbnail']
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

//virtual properties
productSchema.virtual('totalLikes').get(function () {
    return this.likes.length;
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product;