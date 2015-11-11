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
	router.post('/signin', passport.authenticate('signin', {
		successRedirect : '/design',
		failureRedirect : '/signin',
		failureFlash : true
	}));

	/* GET Login page */
	router.get('/signin', function(req, res) {
		res.render('signin', { message: req.flash('message') });
	});
	/* Handle POST Sign-up */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect : '/design',
		failureRedirect : '/signin',
		failureFlash : true
	}));

	// /* GET Sign-up page */
	// router.get('/signup', function(req, res) {
	// 	res.render('signup', { message: req.flash('message') });
	// });

	/* GET Design page */
	router.get('/design', isAuthenticated, function(req, res) {
		res.render('design', { 
			message: req.flash('message'),
			user: req.user
		});
	});


	/* GET Edit page */
	router.get('/edit', isAuthenticated, function(req, res) {
		res.render('edit', { 
			message: req.flash('message'),
			user: req.user
		});
	});

	/* Handle POST Edit */
	router.post('/edit', passport.authenticate('edit', {
		successRedirect : '/design',
		failureRedirect : '/edit',
		failureFlash : true
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	return router;
}





