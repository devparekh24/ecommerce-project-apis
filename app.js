const express = require('express')
const cookieParser = require('cookie-parser')
const errorController = require('./controller/errorController')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const productTypeRouter = require('./routes/productTypeRoutes')
const commentRouter = require('./routes/commentRoutes')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/product-types', productTypeRouter)
app.use('/comments', commentRouter)
app.use(errorController)

module.exports = app