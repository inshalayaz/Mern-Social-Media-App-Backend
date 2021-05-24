const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const postRoutes = require('./routes/posts')

const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }))
app.use(cors())

app.use('/posts', postRoutes)

// Connecting to DataBase

const CONNECTION_URL = 'mongodb+srv://inshalayaz:inshal14@cluster0.zopu7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => app.listen(PORT, () => console.log(`Server running on ${PORT}`) ))
    .catch(error => console.log(error.message))

mongoose.set( 'useFindAndModify', false )
