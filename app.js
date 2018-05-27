//import { request } from 'https';

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
const Schema = mongoose.Schema
const path = require('path');
module.exports.myApp = app;
module.exports.myBodyParser = bodyParser;
var passport = require("passport");
module.exports.myPassport = passport;
var auth = require('./services/auth');
var model = require('./models/entitymodels');
module.exports.myPath = __dirname + '/client';

// app.use(express.static(path.join(__dirname + 'client')));
app.use(express.static(path.join(__dirname, 'client')));
// app.use(express.static(path.join(__dirname + 'client/content/home')))

//connect server
mongoose.connect('mongodb://localhost/blogDb', (err, database) => {
    if (err) console.log(err)
    app.listen(3001, function () {
        console.log('listening to 3001')
    })
    console.log('Server is Connected!')
})

// app.get('*', (req, res) => {
//     if (req.isAuthenticated) {
//         console.log(req.user)
//     }
// });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/views/layout.html')
});

app.get('/user', function(req, res) {
    if (req.user == undefined) res.json('null');
    else res.json(req.user.UserName);
})

app.get('/post-details/:id', function (req, res) {
    if (req.params.id == undefined) {
        res.redirect('/');
    }
    else{
        res.sendFile(__dirname + '/client/views/layout.html')
    }
});

app.get('/edit-post/:id', function (req, res) {
    if (req.params.id == undefined) {
        console.log('Error');
    }
    else {
        res.sendFile(__dirname + '/client/views/layout.html')
    }
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/client/views/login.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/client/views/login.html');
})
// app.get('/blog', function (req, res) {
//     res.sendFile(__dirname + '/client/views/layout.html')
// })

app.get('/newpost', function (req, res) {
    res.sendFile(__dirname + '/client/views/layout.html')
})



require('./controller/Post');
require('./controller/User');