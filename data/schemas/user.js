var mongoose = require('mongoose');
var WatchedSeriesSchema = require('../schemas/watchedSeries');
var checkLength = function(val) {
    if (val && val.length < 10) {
        return false;
    } else {
        return true;
    }
};

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        validate: {
            validator: checkLength,
            message: "{PATH}: Minstens 10 karakters"
        }
    },
    password: String,
    username: String,
    series: [WatchedSeriesSchema]
});

module.exports = UserSchema;