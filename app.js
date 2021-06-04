const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose'); // Also Create a Config folder for our key

const app = express();

//DB config
const db = require('./config/keys').MongoURI;

//Connec To Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Our MongoDB is connected'))
  .catch((err) => console.log(err));

//EJS // app.use has to be above app.set// MiddleWare
app.use(expresslayouts);
app.set('view engine', 'ejs');
//--------Bodyparser
app.use(express.urlencoded({ extended: false }));
//----------------------------------

//Main Page
app.use('/', require('./routes/index'));

// This is getting routed to users.js
app.use('/users', require('./routes/users'));

// My test Route
app.use('/tests', require('./routes/testing'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on ${PORT}`));
