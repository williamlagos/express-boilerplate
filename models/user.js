var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

/* Sequelize models: movies and users, with appropriate hashing for password */
module.exports = function(database,DataTypes){
    var User = database.define('user',{
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
    return User;
};
