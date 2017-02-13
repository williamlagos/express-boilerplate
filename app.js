var bcrypt = require('bcrypt');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var epilogue = require('epilogue');

var index = require('./routes/index');
var users = require('./routes/users');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('node','root','mk28to#$',{ logging:console.log });

/* Sequelize models: movies and users, with appropriate hashing for password */
var User = sequelize.define('user',{
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
    }
});

var Movie = sequelize.define('movie',{
    title: { type: Sequelize.STRING },
    director: { type: Sequelize.STRING },
    quantity: { type: Sequelize.INTEGER }
});

Movie.belongsTo(User);

// Force write: in true, will drop the table if it already exists; execute query to test
User.sync({force: true}).then(function(){
    User.create({
        name: 'Jack',
        email: 'jack@default.com',
        password: 'passwd',
    });/*.then(function(){
        User.findAll().then(function(users){
            console.log(users);
        });
    });*/
});

var app = express();

epilogue.initialize({
    app: app,
    sequelize: sequelize
});

var userResource = epilogue.resource({
    model: User,
    endpoints:['/users','/users/:id']
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
