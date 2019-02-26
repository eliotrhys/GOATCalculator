var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


// root route
router.get('/', function(req, res){
  res.render('landing');
});

// ================
// AUTH ROUTES
// ================

// show register form

router.get('/register', function(req, res){
  res.render('register');
});

//handle sign up logic

router.post('/register', function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function(){
      req.flash('success', 'Welcome to FightCARDS? ' + user.username);
      res.redirect('/fighters');
    });
  });
});

// show login form

router.get('/login', function(req, res){
  res.render('login');
});

// handling log in logic

router.post('/login', passport.authenticate('local',
{
  successRedirect: "/fighters",
  failureRedirect: '/login'
}), function(req, res){
});

// logout ROUTE

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('fighters');
});

module.exports = router;
