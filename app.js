const express = require('express')
const cookieParser = require('cookie-parser')
const errorController = require('./controller/errorController')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/users', userRouter)
app.use('/products', productRouter)

app.use(errorController)

module.exports = app