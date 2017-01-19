var mongoose = require("mongoose");
var WatchedSeriesSchema = require("../schemas/watchedSeries");
//var initializer = require("../initializerCollections");
var q = require("q");

var UsersRepo = (function() {
    var User = require("./user.js");

    /*   var getAllUsers = function (callback) {
        User.find({}).sort('lastName').exec(function (err, docs) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
 
            callback(null, docs);
        });
    },
        findUserById = function (id, success, fail) {
            User.findOne({ _id: id }, function (error, doc) {
                if (error) { fail(error); } else { success(doc); }
            });
        },
        createUser = function (user, next) {
            //single model command = create combineert new en save
            User.create(user, function (err) {
                //via het model
                if (err) { return next(err); }
                next();
            });
}  ;*/

    /*var updateSeriesUser = function (user, id, next){
    console.log("show.js//  " + user+ " //" + "serieId//  "+ id)+" //";
        var query ={_id: user};
        var update ={
             serie: id
        };
        var upsert ={upsert: true};
        User.findOneAndUpdate(query, update,upsert, function (err, user){
            if (err) {
                console.log(err);
                next(err, null);
            }
            next(null, user);
}),
// add season id if season doesn't exist
    /*    var query = {_id: user};
        var update = {
series: {$nin: [id]}},
            {$push: {'series':{
                WatchedSeriesSchema:[{
                    id:id,
                    EpisodesWatched:[]      
                }]}}}
};*/
    /*
    console.log("USER: " + user +" ID "+id);
            User.update(
                {_id: user, series: {$nin: [id]}},
                {$push: {'series':{
                    WatchedSeriesSchema:[{
                        _id:id,
                        EpisodesWatched:[{}]      
                    }]}}},
                {upsert: true},function (err, user){
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, user);
            });
    },*/
    //werkt nog niet volledig
    /*
    getSeriesByUser = function(user) {
            var UsersSeries = [];
            user.series.forEach(function(element) {
                MovieDB.tvInfo({ id: element.id }, function(err, serie) {
                    UsersSeries.push(serie);
                    console.log("#serie " + serie);
                    next(err, UsersSeries);
                });
            });
        },
        */
    /* var updateSeriesUser = function(userid, seriesid) {
            console.log(userid, seriesid);
            return q.Promise(function(resolve, reject) {
                var query = { _id: User._id, 'series.seriesID': { '$ne': seriesid } };
                var series = { seriesID: seriesid, EpisodesWatched: [] };
                var update = { $push: { 'series': series } };

                User.findOneAndUpdate(query, update, { new: true }, function(error, doc) {
                    if (error) { reject(error); } else { console.log(doc);
                        resolve(doc); }
                });
            })
}*/
    var updateSeriesUser = function(userid, seriesid, next) {
            var query = { _id: userid, 'series.seriesID': { '$ne': seriesid } };
            var series = { seriesID: seriesid, EpisodesWatched: [] };
            var update = { $push: { 'series': series } };

            User.findOneAndUpdate(query, update, { new: true }, function(error, doc) {
                if (error) { next(err, null) } else {
                    console.log("document updated", doc);
                    next(null, doc);
                }
            });
        },
        /* markEpisodeAsWatched = function(userid, seriesid, seasonid, episodeid) {
             console.log("userid "+userid+"seriesid "+seriesid+"seasonid "+ seasonid+ "episodeid");
              var seasonEpisodeID = seasonid.concat("0").concat(episodeid);
             console.log("seasonEpisodeID "+ seasonEpisodeID);
             var query = { _id: userid, 'series.seriesID': seriesid, 'series.EpisodesWatched._id': { '$ne': episodeid }, 'series.EpisodesWatched.seasonid': seasonid };
             var watchedepisode = { _id: episodeid, seasonid: seasonid, skipped: false };
             var update = { $push: { 'series.EpisodesWatched': watchedepisode } };

             user.findOneAndUpdate(query, update, { new: true }, function(error, doc) {
                 if (error) { console.log(error); } else { console.log(doc); }
             });
         };*/
        /*   markEpisodeAsWatched = function(userid, seriesid, seasonid, episodeid) {
            console.log("userID "+ userid + "serieID "+ seriesid+"seasonID "+ seasonid+ "episodeID "+episodeid);
           
            var query = {
                 _id: userid, 
                 'series.seriesID': seriesid,
                 $and:[
                     {'series.EpisodesWatched.seasonID': { '$ne': seasonid }},
                     {'series.EpisodesWatched.episodeID': { '$ne': episodeid }}
                     ]};
            var watchedepisode = { episodeID: episodeid, seasonID: seasonid, skipped: false };
            var update = { $push: { 'series.EpisodesWatched': watchedepisode } };

            User.findOneAndUpdate(query, update, { new: true }, function(error, doc) {
                if (error) { console.log(error); } else { console.log(doc); }
            });
};*/
        markEpisodeAsWatched = function(userid, seriesid, seasonid, episodeid, next) {
            var watchedepisode = { episodeID: episodeid, seasonID: seasonid, skipped: false };
            var query = {
            _id: userid,
                      series: {
                $elemMatch: {
                    seriesID: seriesid,
                    EpisodesWatched:{
                        $not:{
                            $elemMatch: {episodeID: episodeid, seasonID: seasonid}
                        }
                    }
                }
            }
            }
                


            var update = { $push: { 'series.$.EpisodesWatched': watchedepisode } };
            User.findOneAndUpdate(query, update, { new: true }, function(error, doc) {
                if (error) {
                    console.log("het werkt niet"+error);
                    next(error, null);
                } else {
                    next(null, doc);
                    console.log("updated"+doc);
                }
            });
        };
    /*updateSeriesUser = function(userid, seriesid) {
      console.log("USER: " + userid +" ID "+seriesid);
        var query = { _id: userid };
        var update = { $push: {
            'series':{ WatchedSeriesSchema:[{id: seriesid}]}
            } };
 
        User.findOneAndUpdate(query, update, true, function(error, doc) {
            if (error) {  console.log(error); } else { console.log("DOC "+doc); }
        });
    };*/
    return {
        model: User,
        /* getAllUsers: getAllUsers,
         findUserById: findUserById,
         createUser: createUser,*/
        updateSeriesUser: updateSeriesUser,
        markEpisodeAsWatched: markEpisodeAsWatched
    };
})();


module.exports = UsersRepo;