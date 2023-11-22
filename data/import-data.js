const mongoose = require('mongoose')
const dontenv = require('dotenv')
const Product = require("../model/productModel")
const ProductType = require("../model/productTypeModel")
const User = require('../model/userModel')
const Comment = require('../model/commentModel')
const fs = require('fs')

dontenv.config()

const db = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
    .connect(db)
    .then(() => // console.log(con.connections)
        console.log('DataBase Connected Successfully...')
    );


const products = JSON.parse(fs.readFileSync(`${__dirname}/product.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, 'utf-8'))
const producttypes = JSON.parse(fs.readFileSync(`${__dirname}/category.json`, 'utf-8'))
const comments = JSON.parse(fs.readFileSync(`${__dirname}/comments.json`, 'utf-8'))

//import data into collection 
const importData = async () => {
    try {
        await Product.create(products)
        await User.create(users, { validateBeforeSave: false })
        await ProductType.create(producttypes)
        await Comment.create(comments)
        console.log('Data successfully loaded...')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

//deleting data from db
const deleteData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await ProductType.deleteMany()
        await Comment.deleteMany()
        console.log('Data successfully deleted...')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

console.log(process.argv)

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}