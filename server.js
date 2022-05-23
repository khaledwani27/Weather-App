// Server setup
const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherBD', { useNewUrlParser: true })
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', api)

const port = 4100
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})