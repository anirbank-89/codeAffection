var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
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

app.use('/', indexRoute)

// MIDDLEWARE SETUP
// View engine setup

app.listen(PORT, ()=>{
    console.log(`App listening at port ${PORT}`);
});