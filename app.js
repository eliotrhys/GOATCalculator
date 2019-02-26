var express    = require('express'),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require('mongoose'),
    flash      = require('connect-flash'),
    passport   = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride = require('method-override'),
    Fighter = require('./models/fighter'),
    Comment    = require('./models/comment'),
    User       = require('./models/user'),
    seedDB     = require('./seeds.js');

// requiring routes
var commentRoutes = require('./routes/comments'),
    fighterRoutes = require('./routes/fighters'),
    indexRoutes = require('./routes/index');

// mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
mongoose.connect("mongodb://yelpcampuser:yelpcamp123@ds119024.mlab.com:19024/yelpcampeliot", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

// seedDB(); // seed the database

// PASSPORT CONFIGURATION

app.use(require('express-session')({
  secret: 'Once again Rusty wins cutest dog!',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/fighters/:id/comments', commentRoutes);
app.use('/fighters', fighterRoutes);

app.listen(process.env.PORT || 5000);
