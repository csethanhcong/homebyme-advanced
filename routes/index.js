var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	console.log(req.isAuthenticated());
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET Homepage */
	router.get('/', function(req, res) {
		res.render('index', { message: req.flash('message') });
	});
	
	/* Handle POST Login */
	router.post('/login', passport.authenticate('login', {
		successRedirect : '/design',
		failureRedirect : '/login',
		failureFlash : true
	}));

	/* GET Login page */
	router.get('/login', function(req, res) {
		res.render('login', { message: req.flash('message') });
	});
	/* Handle POST Sign-up */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect : '/design',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	/* GET Sign-up page */
	router.get('/signup', function(req, res) {
		res.render('signup', { message: req.flash('message') });
	});

	/* GET Design page */
	router.get('/design', isAuthenticated, function(req, res) {
		res.render('design', { message: req.flash('message') });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





