var express = require('express');
var router = express.Router();
var userrepo = require('../data/models/usersRepo');
var showrepo = require('../data/models/show');

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function(passport) {

    /* GET index page. */
    router.get('/', function(req, res) {
        showrepo.getSeries(function(err, show) {
            console.log(err);
            console.log(show);
            res.render('index', {
                title: 'express',
                user: req.user,
                show: show
            });
        });
    });

    /* GET login page. */
    router.get('/login', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('login', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res) {
        res.render('register', { message: req.flash('message') });
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res) {
        showrepo.getSeries(function(err, show) {
            console.log(err);
            console.log(show);
            res.render('home', {
                title: 'express',
                user: req.user,
                show: show
            });
        });
    });
    router.post('/detail/:_id/:id', isAuthenticated, function(req, res) {
        console.log("teeest");
        userrepo.updateSeriesUser(req.params._id, req.params.id, function(err, user) {
            // console.log(user);
            if (err) {
                res.status(500).send('Server error occured while requesting ticket.');
                res.end();
            }
            res.redirect("/");
        })
    });
    router.get('/detail/:id', function(req, res) {
        showrepo.getSeriesById(req.params.id, function(err, show) {
            console.log(show);
            if (err) {
                res.status(500).send('Server error occured while requesting ticket.');
                res.end();
            }
            res.render('detail', { user: req.user, show: show });
        });
    });

    router.get('/seasondetail/:sid/:seid', function(req, res) {
        showrepo.getSeasonById(req.params.sid, req.params.seid, function(err, show) {
            console.log(show);
            if (err) {
                res.status(500).send('Server error occured while requesting ticket.');
                res.end();
            }
            res.render('seasondetail', { user: req.user, show: show });
        });
    });


    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}