/*var Client = require("node-tvdb");
var tvdb = new Client("277BCE9339B4CAD9"); // lang defaults to "en" 

showrepo = (function() {
    var getSeries = function(next) {
        tvdb.getSeriesByName("Thrones", function(err, serie) {
            console.log(err, serie);
            next(err, serie);
        });
    };

    return {
        getSeries: getSeries
    };
})();

module.exports = showrepo;*/

var MovieDB = require('moviedb')('bddb2ffe821b6b28acf4db374f786183');
//var async = require('async');

showrepo = (function() {
    var getSeries = function(next) {
        MovieDB.miscPopularTvs(function(err, serie) {
            //console.log(err, serie);
            next(err, serie);
        });
    };

    var getSeriesById = function(id, next) {
        console.log("GETSERIESBYID" + id);
        MovieDB.tvInfo({ id: id }, function(err, serie) {
            console.log("GETSERIESBYID" + err, serie);
            next(err, serie);
        });
    }

    var getSeasonById = function(sid, seid, next) {
        MovieDB.tvSeasonInfo({ season_number: seid, id: sid }, function(err, serie) {
         //   console.log(serie);
            next(err, serie);
        });
    }
      var getNextEpisodesByUser = function(user, next) {



        getSeriesByUser(user, function(err, series) {

            var collection = [];

            for (let k = 0; k < series.length; k++) {



                var info = series[k];

                console.log("INFO");

                console.log(info);

                var nos = info.seasons.length - 1;

                console.log("seasons length= ", nos);

                ietslabel:

                    for (let i = 1; i <= nos; i++) {

                        //episodecount

                        var ec = info.seasons[i].episode_count

                        console.log("episodes: ", ec);

                        for (let j = 1; j <= ec; j++) {

                            var serieselect = user.series.filter(function(v) {

                                return v.seriesID == info.id

                            })



                            if (serieselect.length == 0) {

                                console.log("No episodes watched")

                                console.log({ 'seriesid': info.id, 'eid': j, 'sid': i });

                                collection.push({ 'seriesid': info.id, 'eid': j, 'sid': i });

                            } else {

                                console.log("Episodes Watched true")

                                var epi = serieselect[0].EpisodesWatched.filter(function(v) {

                                    return v.episodeID == j && v.seasonID == i

                                })

                                if (epi.length == 0) {

                                    console.log({ 'seriesid': info.id, 'eid': j, 'sid': i });

                                    collection.push({ 'seriesid': info.id, 'eid': j, 'sid': i });

                                } else {

                                    continue;

                                }

                            }

                            break ietslabel;

                        }

                    }

            }

            console.log(collection)

            next(collection);

        })

    }
    var getSeriesByUser = function(user, next) {
        var userSeries = []
        var count = 0;

        function callback(items) { next(null, items); }
        var getdata = function(id, nexte) {
            MovieDB.tvInfo({ id: id.seriesID }, function(err, serie) {
                console.log("#serie " + serie);
                nexte(err, serie);
            });
        }

        if (user.series.length == 0) {
            next(null, null)
        } else {
            user.series.forEach(function(id) {
                getdata(id, function(err, res) {
                    console.log("res " + res);
                    userSeries.push(res);
                    count++;
                    console.log("COUNT" + count)
                    console.log("plzzzzz" + userSeries);
                    if (count === user.series.length) {
                        callback(userSeries);
                    }
                })
            });
        }
      
        }
        var getSeriesByName = function(name, next){
            console.log("name "+name);
                MovieDB.searchTv({query:name},function(err,serie){
                    console.log("SEARCH888888888888888888888888888888888" +serie)
                    next(err, serie);
                });
        }
    return {
         getSeriesByName:getSeriesByName,
        getSeriesByUser: getSeriesByUser,
        getSeasonById: getSeasonById,
        getSeries: getSeries,
        getSeriesById: getSeriesById,
        getNextEpisodesByUser: getNextEpisodesByUser
    };
})();

module.exports = showrepo;
/*showRepo = (function() {
    var getSeries = function() {
        
        tvdb.getSeriesByName("The Simpsons", function(err, response) {
            return response;
        });
    };
}*/