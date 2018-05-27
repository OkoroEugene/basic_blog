// var express = require('express');
const index = require('../app');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
var model = require('../models/entitymodels');
var app = index.myApp; 
var passport = index.myPassport;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var auth = require('../services/auth')
// var methodOverride = require('method-override')



app.post('/login', passport.authenticate('local-sign-in', {
   successRedirect: '/',
    // failureFlash: true // allow flash messages
}));

app.post('/register', passport.authenticate('local-sign-up', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})