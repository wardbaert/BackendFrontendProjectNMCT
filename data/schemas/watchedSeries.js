var express = require('express');
var mongoose = require('mongoose');

//nested Schema
var WatchedSeriesSchema = new mongoose.Schema({
    seriesID: Number,
    EpisodesWatched: [{
        _id: Number,
        seasonid: Number,
        skipped: Boolean
    }]
});
module.exports = WatchedSeriesSchema;