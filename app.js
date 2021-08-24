var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var indexRoute = require('./routes/index');

var app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', 
  {useNewUrlParser: true, useUnifiedTopology: true}, 
  (err)=>{
      if (!err) {
          console.log('Mongodb connection succeeded');
      }
      else {
          console.log('Error in db connection: '+err);
      }
});
// var db = mongoose.connection;
// db.on('error', ()=>{
//     console.log('Could not connect to database. Something went wrong');
// });
// db.once('open', ()=>{
//     console.log('Connected successfully to database!');
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/', indexRoute);

// MIDDLEWARE SETUP
// View engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname+'/views/layouts' }));

app.listen(PORT, ()=>{
    console.log(`App listening at port ${PORT}`);
});