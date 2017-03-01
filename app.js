#!/usr/bin/env node

/* William Oliveira de Lagos - 2017                  *
 * MOVIE RENTAL SYSTEM API FOR BACKEND               *
 * Node REST API developed in JavaScript             *
 * With Express.js, Passport, Epilogue and Sequelize */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var epilogue = require('epilogue');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

var index = require('./routes/index');

var Sequelize = require('sequelize');
var config = require('./config.json');

var app = express();

/* Persistence configuration with Sequelize and MySQL credentials, read from config.json. */
var database = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        logging:console.log,
        dialect:'sqlite',
        storage:'boilerplate.db'
    }
);

var User = database.import(__dirname+"/models/user");
var Movie = database.import(__dirname+"/models/movie");

// Force write: in true, will drop the table if it already exists; execute query to test
database.sync({force: true}).then(function(){
    User.create({
        name: 'jack',
        email: 'jack@default.com',
        password: 'password',
    });
});

/* API Endpoints organizations by Express.js routes and Epilogue configurations */
epilogue.initialize({
    app: app,
    sequelize: database
});

var userResource = epilogue.resource({
    model: User,
    endpoints:['/users','/users/:id']
});

var movieResource = epilogue.resource({
    model: Movie,
    endpoints:['/movies','/movies/:id']
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* Code for Basic HTTP Authentication with Passport */
app.use('/', index);
passport.use(new Strategy(
    function(username,password,done){
        User.findOne({ username:username }, function(err,user){
            if(err){ return done(err); }
            if(!user){ return done(null,false); }
            if(!user.validPassword(password)){
                return done(null,false);
            }
            return done(null,user);
        });
    }
));
app.post('/me',
    passport.authenticate('basic',{ session: false }),
    function(req,res){ res.json(req.user); });

module.exports = app;
exports.database = database;
