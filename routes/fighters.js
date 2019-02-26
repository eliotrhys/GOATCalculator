var express = require('express');
var router = express.Router();
var Fighter = require('../models/fighter');
var middleware = require('../middleware');


//INDEX - SHOW ALL FIGHTERS
router.get('/', function(req, res){
  Fighter.find({}, function(err, allFighters){
    if(err){
      console.log(err);
    } else {
      res.render('fighters/index', {fighters: allFighters});
    }
  });
});

// CREATE - MAKE NEW FIGHTER
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to fighter array
  //redirect back to fighter Page
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newFighter = {name: name, price: price, image: image, description: desc, author: author}
  // Create a new fighter and save to database
  Fighter.create(newFighter, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect('/fighters');
    }
  })
});

// NEW - PAGE TO ADD NEW FIGHTER
router.get('/new', middleware.isLoggedIn, function(req, res){
  res.render('fighters/new');
});

// SHOW - shows more info about one fighter
router.get('/:id', function(req, res){
  //find the fighter with provided ID
  Fighter.findById(req.params.id).populate('comments').exec(function(err, foundFighter){
    if(err){
      console.log(err);
    } else {
      console.log(foundFighter);
      res.render('fighters/show', {fighter: foundFighter});
    }
  });
});

// EDIT FIGHTER ROUTE

router.get('/:id/edit', middleware.checkFighterOwnership, function(req, res){
  Fighter.findById(req.params.id, function(err, foundFighter){
  res.render('fighters/edit', {fighter: foundFighter});
  });
});

// UPDATE FIGHTER ROUTE

router.put('/:id', middleware.checkFighterOwnership, function(req, res){
  // find and update the correct fighters
  Fighter.findByIdAndUpdate(req.params.id, req.body.fighter, function(err, updatedFighter){
    if(err){
      res.redirect('/fighters');
    } else {
      res.redirect('/fighters/' + req.params.id);
    }
  });
});

// DESTROY FIGHTER ROUTE

router.delete('/:id', middleware.checkFighterOwnership, function(req, res){
  Fighter.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect('/fighters');
    } else {
      res.redirect('/fighters');
    }
  });
});

module.exports = router;
