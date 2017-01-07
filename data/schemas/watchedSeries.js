var express = require('express');
var mongoose = require('mongoose');

//nested Schema
var WatchedSeriesSchema = new mongoose.Schema({
    _id: Number,
    EpisodesWatched: [{
        _id: Number,
        seasonid: Number,
        skipped: Boolean
    }]
});
module.exports = WatchedSeriesSchema;