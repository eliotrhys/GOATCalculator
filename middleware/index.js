var Fighter = require('../models/fighter');
var Comment = require('../models/comment');

// all middleware goes here
var middlewareObj = {};

middlewareObj.checkFighterOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Fighter.findById(req.params.id, function(err, foundFighter){
      if(err){
        req.flash('error', 'Fighter not found!')
        res.redirect('back');
      } else {
        // does user own the fighter?
        if(foundFighter.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that!")
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that!')
    res.redirect('back');
  }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect('back');
      } else {
        // does user own the comment?
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          rq.flash("error", "You don't have permission to do that!")
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('back');
  }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('/login');
}



module.exports = middlewareObj;
