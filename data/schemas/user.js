var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userName: {type: String, unique: true},
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
    series: [
        WatchedSeriesSchema
    ]
});

module.exports = UserSchema;