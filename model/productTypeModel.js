const mongoose = require('mongoose');

const ProductTypeSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Product must has its Category'],
        unique: true
    }
},{
    toJSON:true,
    toObject: true,
    timestamps: true
})

const ProductType = mongoose.model('ProductType', ProductTypeSchema)
module.exports = ProductType