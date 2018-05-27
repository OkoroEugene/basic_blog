// var express = require('express');
const index = require('../app');
var app = index.myApp; 
const auth = index.myPassport;
var app = index.myApp; 
// const flash = require('connect-flash');
const bodyParser = index.myBodyParser;
var model = require('../models/entitymodels');
var passport = index.myPassport;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var methodOverride = require('method-override')

// app.use(express.static(path.join(__dirname, 'client')));
app.use(cookieParser('secret'));
// app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true, 
    cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    model.UserSchema.findById(userId, (error, user) => {
        if (error) return done(error, false)
        //console.log(user)
        done(null, user)
    })
})

passport.use('local-sign-in', new LocalStrategy({
    /*usernameField : 'email',
    passwordField : 'Password',*/
    passReqToCallback : true
},
    function (req,username, password, done) {
        model.UserSchema.findOne({ UserName: username }, function (err, user) {            
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.Password != password) { return done(null, false); }
            // console.log(user)           
            return done(null, user);
        });
    }
));
