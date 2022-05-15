const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo');

const ejs = require('ejs')

const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')

const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/smartedu-db')
  .then(() => console.log("DB-Connected"))
  .catch((err) => console.log(err))

//Template Engine
app.set("view engine", "ejs");


// Global Variables
global.userIN = null;

//Middlewares

app.use(express.static("public"))
app.use(express.json())// for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-ulrencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/smartedu-db',
    ttl: 4 * 60 * 60
    //  crypto: {
    //   secret: 'squirrel'
    // }
  })
}))


// Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoute)
app.use('/courses', courseRoute)
app.use('/categories', categoryRoute)
app.use('/users', userRoute)


const port = 3000;
app.listen(port, () => {
  console.log(`App started in port http://localhost:${port}`);
});
