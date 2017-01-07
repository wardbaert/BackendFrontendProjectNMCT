var mongoose = require("mongoose");
var initializer = require("../initializerCollections");
var Promise = require("q");

var UsersRepo = (function () {
    var User = require("./user.js");
     
    var getAllUsers = function (callback) {
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
        }  ;
    
    return {
        model :User ,
        getAllUsers: getAllUsers,
        findUserById: findUserById,
        createUser: createUser
    };
})();

module.exports = UsersRepo;