var mongoose = require('mongoose');
var UserSchema = require("../schemas/user");

var User = mongoose.model('User', UserSchema, "users");

User.getUsers = function(callback) {
    User.find({}).exec(function(err, docs) {
        if (err) { console.log(err); }
        callback(docs);
    });
};

module.exports = User;