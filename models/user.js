var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    id: String,
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    Series: [{
        id: Number,
        EpisodesWatched: [{
            id: Number,
            seasonid: Number,
            skipped: Boolean
        }]
    }]
});