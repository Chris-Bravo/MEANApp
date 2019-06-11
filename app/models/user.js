var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); //encrypt the password
var Schema = mongoose.Schema;

/*user model*/
userSchema = new Schema({
    username: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    firstName: {type: String, required: true, unique: false, lowercase: true},
    lastName: {type: String, required: true, unique: false, lowercase: true},
    description: {type: String, required: false, unique: false, lowercase: true}
});


userSchema.pre('save', function(next) {
    
    var user = this;

    /*encrypt the password*/
    bcrypt.hash(user.password, 10, function(err, hash) {
        user.password = hash;
        next();    
    });
})

/*method to compare the password*/
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

/*export the module*/
module.exports = mongoose.model('User', userSchema);