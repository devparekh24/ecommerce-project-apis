const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    likes: {
        type: Boolean,
        default: false
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'like must belong to a product']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'like must belong to a user']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

const Like = mongoose.model('Like', likeSchema)
module.exports = Like