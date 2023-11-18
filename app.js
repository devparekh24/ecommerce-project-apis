const express = require('express')
const cookieParser = require('cookie-parser')
const errorController = require('./controller/errorController')
const userRouter = require('./routes/userRoutes')

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/users', userRouter)

app.use(errorController)

module.exports = app