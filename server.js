const mongoose = require('mongoose');
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()

const db = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(db).then(() => console.log('DataBase Connected Successfully...'));

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Connection established with the sever on port : ${port}`))