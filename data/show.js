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

    return {
        getSeries: getSeries
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