#!/usr/bin/env node

/* William Oliveira de Lagos - 2017                  *
 * MOVIE RENTAL SYSTEM API FOR BACKEND               *
 * Node REST API developed in JavaScript             *
 * With Express.js, Passport, Epilogue and Sequelize */

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var epilogue = require('epilogue');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
    model: User, endpoints:['/users','/users/:id']
});

var movieResource = epilogue.resource({
    model: Movie, endpoints:['/movies','/movies/:id']
});

app.use(logger('combined'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({where: {id: id}}).then(function(user){
    done(null, user);
  }).else(function(err){
    done(err, null);
  });
});

// Use local strategy to create user account
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: { name: username }}).then(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (!user.checkPassword(password)) {
        done(null, false, { message: 'Invalid password'});
      } else {
        done(null, user);
      }
    }).error(function(err){
      done(err);
    });
  }
));

/* Code for Basic HTTP Authentication with Passport */
app.use('/', index);

module.exports = app;
exports.database = database;
