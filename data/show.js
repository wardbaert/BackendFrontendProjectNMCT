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

showrepo = (function() {
    var getSeries = function(next) {
        MovieDB.miscPopularTvs( function(err, serie) {
            //console.log(err, serie);
            next(err, serie);
        });
    };

    var getSeriesById = function(id, next){
        MovieDB.tvInfo({id: id}, function(err, serie) {
            console.log(err, serie);
            next(err, serie);
        });
    }

    var getSeasonById = function(sid, seid, next){
     MovieDB.tvSeasonInfo({season_number: seid}, {id: sid},function(err, serie){
            console.log(serie);
            next(err, serie);
        });
    }
    return {
        getSeasonById: getSeasonById,
        getSeries: getSeries,
        getSeriesById: getSeriesById
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