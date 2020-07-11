// Include Express it is a web app framework
const express = require('express');
const path = require('path');
// port number is associated with every software in any pc
const port = 8000;

// require the db
const db = require('./config/mongoose');

// reqire Contact Collection
const Contact = require('./models/contact');


const app = express();

// set the view engine as Ejs/Embedded JavaScript
app.set('view engine', 'ejs');

// set path where the views/templates 
app.set('views', path.join(__dirname, 'views'));

// include static files like js/css/images using MiddleWare function
app.use(express.static('assets'));

// MiddleWare
// Using MiddleWere we can manipulate the request and response
app.use(express.urlencoded());
// // Custom MiddleWare
// app.use(function(req,res,next){
//      req.myName="Nitish";
//     console.log('MiddleWare 1');
//     // next is the function
//      next();
// });

// contact list Array
var contactList = [
    {
        name: "Nitish",
        phoneNum: "11111111111"
    },
    {
        name: "Nitish",
        phoneNum: "11111111111"
    }
    , {
        name: "Nitish",
        phoneNum: "11111111111"
    }
]

// for each url we can have a rsponse

//Controller in FrameWork Architecture
app.get('/', function (req, res) {

    // __dirname is path where this file is present in pc 
    console.log(__dirname);

    // fetching data from coolection
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('error in fetching db');
            return;
        }

        //controller will take view/template from views folder 
        return res.render('home', {
            title: 'My Conatact List',
            heading: 'My first Express JS page',
            contact_list: contacts
        });
    });

});


app.get('/practice', function (req, res) {
    // __dirname is path where this file is present in pc 
    console.log(__dirname);
    //controller will take view/template from views folder 
    return res.render('practice', {
        title: 'My Conatact List',
        heading: 'My first Express JS page',
    });
});

// handle request from form 
app.post('/create_contact', function (req, res) {
    // add the req contact in array of contactlist
    // contactList.push({
    //     name:req.body.name,
    //     phoneNum:req.body.phoneNum,
    // })

    // add contact in Contact Collection of db
    Contact.create({

        name: req.body.name,
        phoneNum: req.body.phoneNum
    }, function (err, newContact) {
        if (err) {
            console.log('Error in creating a contact');
            return;
        }
        console.log('*******', newContact);
        // redirect to homepage and show the updated contact list
        res.redirect('back');

    });

});

// delete contact
// phone is param in this route
app.get('/delete-contact/:id', function (req, res) {
    console.log(req.params)
    // get the id of contact to delete
    let id = req.params.id;
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting an element from db');
            return;
        }
        res.redirect('/');
    });
});
app.listen(port, function (err) {
    if (err) {
        console.log(`Error ${err}`)
    } else {
        console.log('Server is up and ruuning on port :' + port);
    }
})
