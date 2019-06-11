var express = require('express'); //Express.js
var morgan = require('morgan'); //Log server activity
var mongoose = require('mongoose'); //Connect with MongoDB
var bodyParser = require('body-parser'); //Parse JSON
var passport = require('passport');
var User = require('./app/models/user'); //User model
var path = require('path');
var app = express();
var router = express.Router();
var appRouter = require('./app/routes/api')(router);
var social = require('./app/passport/passport')(app, passport);

app.use(morgan('dev'));
app.use(bodyParser.json()); //Parse the request to json/application
app.use(bodyParser.urlencoded({ extended: true })); //Parse the request to urlencoded
app.use(express.static(__dirname + '/public')) //Use a static path of the project
app.use('/api', appRouter);

/*serve the index.html*/
app.get('*', function(req, res) {
    res.sendfile(path.join(__dirname + '/public/app/views/index.html'))
})

/*connect with MongoDB*/
mongoose.connect('mongodb://localhost:27017/tutorial',{useNewUrlParser: true}, function(err) {
    if(err) {
        console.log('Not connected to MongoDB ', err)
    } else {
        console.log('Conected!')
    }
});

/*listen the port:8080*/
app.listen(process.env.PORT || 8080, function() {
    console.log('Running the server');
});