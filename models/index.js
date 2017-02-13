var Sequelize = require('sequelize');
var config = require('./database.json');

var database = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    { logging:console.log });

exports.database = database;
database.sync({ force: true });
