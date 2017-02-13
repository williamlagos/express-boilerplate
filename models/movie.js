var Sequelize = require('sequelize');

module.exports = function(database,DataTypes){
    var Movie = database.define('movie',{
        title: { type: Sequelize.STRING },
        director: { type: Sequelize.STRING },
        quantity: { type: Sequelize.INTEGER }
    });
    return Movie;
};
