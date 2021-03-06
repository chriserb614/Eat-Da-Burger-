// npm packages
var express = require('express')
var bodyparser = require('body-parser')
var path = require('path')
var morgan = require('morgan')
var expresshbs = require('express-handlebars')
var methodOverride = require("method-override") 

// new express app
var app = express()

// middleware
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.engine('hbs', expresshbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

var db = require('./models')

require('./routes/api-routes.js')(app)

var PORT = process.env.PORT || 3000
// listening port
db.sequelize.sync().then(function (){
  
  app.listen(PORT, function (e) {
    if (e) throw e
  })

})
