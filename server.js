require('dotenv').config()

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


app.use(bodyParser.urlencoded({extended: true}))

// use of static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/img'))



const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const sessionRouter = require('./routes/sessions')
app.use('/sessions', sessionRouter)

app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('view engine', 'ejs')

app.listen(port, () => console.log("Server OK!"))

