var express = require('express');
var mongoose = require('mongoose');

//nested Schema
var WatchedSeriesSchema = new mongoose.Schema({
    seriesID: Number,
    EpisodesWatched: [{
        episodeID: Number,
        seasonID: Number,
        skipped: Boolean
    }]
});
module.exports = WatchedSeriesSchema;