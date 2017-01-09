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
        MovieDB.miscPopularTvs(function(err, serie) {
            //console.log(err, serie);
            next(err, serie);
        });
    };

    var getSeriesById = function(id, next) {
        console.log("GETSERIESBYID"+id);
        MovieDB.tvInfo({ id: id }, function(err, serie) {
            console.log("GETSERIESBYID"+err, serie);
            next(err, serie);
        });
    }

    var getSeasonById = function(sid, seid, next) {
        MovieDB.tvSeasonInfo({ season_number: seid, id: sid }, function(err, serie) {
            console.log(serie);
            next(err, serie);
        });
    }
     var getSeriesByUser = function(user, next) {
      var userSeries = []
      var count = 0;

      function callback (items) { next(null,items); }
      var getdata = function(id, nexte){
        MovieDB.tvInfo({id:id.seriesID},function(err, serie){
           console.log("#serie " + serie); 
           nexte(err, serie);
        });} 


       user.series.forEach(function(id){
        getdata(id, function(err, res){
            console.log("res "+res);
            userSeries.push(res);
            count++;
            console.log("COUNT"+count)
        console.log("plzzzzz"+userSeries);
        if(count === user.series.length){
            callback(userSeries);
        }
        })    
       });  
        /*MovieDB.tvInfo({ id: user.series[2].seriesID }, function(err, serie) {
                    console.log(JSON.stringify(serie, null, 10)); 
                    next(err, serie);                
                });     
                /*MovieDB.tvInfo({ id: "44217" }, function(err, serie) {
                    console.log("#serie " + serie); 
                    next(err, serie);                
                });           */         
        }
    return {
        getSeriesByUser:getSeriesByUser,
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