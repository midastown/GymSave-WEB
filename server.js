// imports and constants
require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const port = 3000

// database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// getting form params
app.use(bodyParser.urlencoded({extended: true}))

// use of static files
app.use(express.static('public'))
app.use('/sessions', express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', './layouts/layout')

// use of routes
const indexRouter = require('./routes/index')
app.use('/', indexRouter)
const sessionRouter = require('./routes/sessions')
app.use('/sessions', sessionRouter)

app.listen(port, () => console.log("Server OK!"))