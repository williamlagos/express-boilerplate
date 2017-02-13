var Sequelize = require('sequelize');

/* Sequelize models: movies and users, with appropriate hashing for password */
module.exports = function(database,DataTypes){
    return database.define('movie',{
        title: { type: Sequelize.STRING },
        director: { type: Sequelize.STRING },
        quantity: { type: Sequelize.INTEGER }
    });
};
