var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'test';

/*set node-router*/
module.exports = function(router) {

    /*POST: 'http://localhost:8080/api/users'*/
    router.post('/users', function(req, res) {
        
        /*create new User*/
        var user = new User;

        /*get the body request*/
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.description = req.body.description;

        /*validation to enforce the registration*/
        if (user.username == null || user.username  == '' || user.password == null || user.password  == '' || user.email == null || user.email == '' || user.firstName == null || user.firstName == '' || user.lastName == null || user.lastName == '') {
            res.json({success: false, message: 'Ensure the Username, Email and Password'});
        } else {
            user.save(function(err) {
                if(err) {
                    res.json({success: false, message: 'Username / Email already exist' });
                } else {
                    res.json({success: true, message: 'User created'});
                }
            })
        }
    })

    /*POST: 'http://localhost:8080/api/authenticate'*/
    router.post('/authenticate', function(req, res){

        /*query on database*/
        User.findOne({ username: req.body.username }).select('email username password firstName lastName description').exec(function(err, user) {

            if(err) throw err;

            if(!user) {
            
                res.json({success: false, message: 'Could not authenticate user'});
            
            } else if (user) {

                if (req.body.password) {

                    var validPassword = user.comparePassword(req.body.password);
            
                    if (!validPassword) {
                        res.json({success: false, message: 'Could not authenticate password'});
                    } else {
                        var token = jwt.sign({ username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName, description: user.description}, secret, { expiresIn: '1h' });
                        res.json({success: true, message: 'User authenticated', token: token});
                    }
            
                } else {
                    res.json({success: false, message: 'No password provided', token: token});
                }
            }
        })
    })

    router.use(function(req, res, next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if(token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Invalid token'})
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.json({ success: false, message: 'No token provided'})
        }
    })

    router.post('/me', function(req, res) {
        res.send(req.decoded);
    })

    return router;
}