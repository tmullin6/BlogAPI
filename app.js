const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const User = require("./models/user");

const app = express();


app.set("./views", __dirname);
app.set("view engine", "ejs");


const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
    ###########################
    TODO: LOGIN JWT TOKEN AUTH
    ###########################

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, 
function (username, password, cb) {

return User.findOne({username, password})
       .then(user => {
           if (!user) {
               return cb(null, false, {message: 'Incorrect username or password.'});
           }

return cb(null, user, {message: 'Logged In Successfully'});
      })
      .catch(err => cb(err));
}
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.TOKEN_SECRET
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));*/

const apiRouter = require("./routes/api");
const adminRouter = require('./routes/admin');

app.use('/api',cors(),apiRouter);
app.use('/',adminRouter);

app.listen(3000, ()=>console.log("Server Listening"));