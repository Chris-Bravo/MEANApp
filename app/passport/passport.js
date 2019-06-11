var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var session = require('express-session')
var jwt = require('jsonwebtoken');
var secret = 'test';

module.exports = function(app, passport){

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
      
    passport.serializeUser(function(user, done) {
        token = jwt.sign({ username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName, description: user.description}, secret, { expiresIn: '1h' });
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: '1347448958742559',
        clientSecret: '07de07786d696045b0f8f0b0ce12b624',
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        /*User.findOrCreate(..., function(err, user) {
          if (err) { return done(err); }
        }); */
        User.findOne({ email: profile._json.email }).select('email username password firstName lastName description').exec(function(err, user) {
            if (err) { 
                return done(err); 
            }
            console.log('USER:', user)
            console.log('PROFILE', profile)
            done(null, profile);
        })
    }));
    
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login'}), function(req, res) {
        res.redirect('/facebook/' + token)
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


}
