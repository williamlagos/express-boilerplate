// Force write: in true, will drop the table if it already exists; execute query to test
/*User.sync({force: true}).then(function(){
    User.create({
        name: 'Jack',
        email: 'jack@default.com',
        password: 'passwd',
    }).then(function(){
        User.findAll().then(function(users){
            console.log(users);
        });
    });
});*/
