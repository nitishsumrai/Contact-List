// require the library
const mongoose = require('mongoose');

// connect the database
mongoose.connect('mongodb://localhost/contact_list_db');

// aquire the connection ( to check if it is successfull)
const db = mongoose.connection;

// it will print the message when an error get generated
db.on('error',console.error.bind(console,'erroe connecting to db'));

// it will print the message when it is up and running
db.once('open',function(){
    console.log('Successfully connected to the database');
});