var Sequelize = require('sequelize');
var epilogue = require('epilogue');
var bcrypt = require('bcrypt');

/* Sequelize models: movies and users, with appropriate hashing for password */
module.exports = function(database,DataTypes){
    return database.define('user',{
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: {
            type: Sequelize.STRING,
            set: function(password){
                var salt = bcrypt.genSaltSync(10);
                console.log(salt);
                console.log(bcrypt.hashSync(password,salt));
                this.setDataValue('password',bcrypt.hashSync(password,salt));
            },
        },
    });
};
