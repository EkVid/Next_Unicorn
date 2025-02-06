const express = require("express");
const app = express();
const port = 8000;

var path = require('node:path');
var hash = require('pbkdf2-password')()
var session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Connect to DB */
// const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgres://uidname:password@host:port/database')

/* Dummy function for testing out skeleton code */
const circle = require("./circle");
app.get("/circle/:radius", function (req, res) {
  res.send(`A circle of radius ${req.params.radius} units has perimeter ${circle.perimeter(req.params.radius)} units and ${circle.area(req.params.radius)} square units.`);
});

/* Mock for building middleware */
app.use(express.urlencoded())
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'The Next Unicorn'
}));

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

/* Mock for login */
const INVESTOR = 1;
const COMPANY = 2;
const ADMIN = 0;
var users = {
  Mack: { name: 'Mack', type: INVESTOR },
  Carol: { name: 'Carol', type: COMPANY },
  Alice: { name: 'Alice', type: ADMIN }
};

hash({ password: 'fizzbuzz' }, function (err, pass, salt, hash) {
  if (err) throw err;
  users.Mack.salt = salt;
  users.Mack.hash = hash;
});

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  users.Carol.salt = salt;
  users.Carol.hash = hash;
});

hash({ password: 'omgzer' }, function (err, pass, salt, hash) {
  if (err) throw err;
  users.Alice.salt = salt;
  users.Alice.hash = hash;
});

/* Authentication */
function authenticate(name, pass, type, fn) {
  console.log('auth %s(%d):%s', name, type, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) {
    console.info("User %s not found", name);
    return fn(null, null);
  } 
  else if (user?.type != type) {
    console.info("User %s of type %d does not match type %d", name, user?.type, type);
    return fn(null, null);
  }
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user)
    fn(null, null)
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/investor/login');
  }
}

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

/* Login pages */

app.get('/', function(req, res){
  res.redirect(req.get('Referrer'));
});

app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/investor/login', function(req, res){
  res.render('login');
});

function setauthenticate(err, user, req, res) {
  if (err) return next(err)
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function () {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('/restricted');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "Mack" and "fizzbuzz")';
      res.redirect('/restricted');
    }
}


app.post('/investor/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, INVESTOR, function (err, user) {
    setauthenticate(err, user, req, res);
  })
});

/* TODO */
app.get('/company/login', function(req, res){
  res.render('login');
});

app.post('/company/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, COMPANY, function (err, user) {
    setauthenticate(err, user, req, res);
  })
});

/* TODO */
app.get('/admin/login', function(req, res){
  res.render('login');
});

app.post('/admin/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, ADMIN, function (err, user) {
    setauthenticate(err, user, req, res);
  })
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});