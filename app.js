var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var epilogue = require('epilogue');
var index = require('./routes/index');

var Sequelize = require('sequelize');
var config = require('./config.json');

var app = express();

var database = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    { logging:console.log });

var User = database.import(__dirname+"/models/user");
var Movie = database.import(__dirname+"/models/movie");

database.sync({ force: true });

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

app.use('/', index);

module.exports = app;
exports.database = database;
