const express = require("express");
const app = express();
const port = 3001;

/* Special constants */
const SERVICE_KEY = 'SUPABASE_SERVICE_KEY'

/* Express */
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

var path = require('node:path');
var hash = require('pbkdf2-password')()
var session = require('express-session');

/* Connect to DBs */
const sjs = require('@supabase/supabase-js');
const supabaseUrl = 'https://bxlkrekpshmetjmsuapm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is not defined");
}
const supabase = sjs.createClient(supabaseUrl, supabaseKey);
// const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgres://uidname:password@host:port/database')

/* Dummy function for testing out skeleton code */
const circle = require("./circle");
app.get("/circle/:radius", function (req, res) {
  res.send(`A circle of radius ${req.params.radius} units has perimeter ${circle.perimeter(req.params.radius)} units and ${circle.area(req.params.radius)} square units.`);
});

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
  next();
});

const INVESTOR = 1;
const COMPANY = 2;
const ADMIN = 0;

var users: { [key: string]: {name: string, type: number, salt: string | null, hash: string | null} } = {
  Mack: { name: 'Mack', type: INVESTOR, salt: null, hash: null },
  Carol: { name: 'Carol', type: COMPANY, salt: null, hash: null  },
  Alice: { name: 'Alice', type: ADMIN, salt: null, hash: null  }
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
  if (!name || !pass) {
    console.info("Bad request");
    return fn(null, null, 401);
  }
  var user = users[name];
  // query the db for the given username
  if (!user) {
    console.info("User %s not found", name);
    return fn(null, null, null);
  } 
  else if (user?.type != type) {
    console.info("User %s of type %d does not match type %d", name, user?.type, type);
    return fn(null, null, null);
  }
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user, null)
    fn(null, null, null)
  });
}

function restrict(req, res, next) {
  console.log(req.body);
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.status(403).json(`Restricted!`);
  }
}

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  var nextlink = 'investor';
  if (!req.session?.user) {
    res.status(201).json(`Already logged out`);
    return;
  }
  switch (req.session?.user?.type) {
    case INVESTOR:
      nextlink = 'investor';
      break;
    case COMPANY:
      nextlink = 'company';
      break;
    case ADMIN:
      nextlink = 'admin';
      break;
  }
  req.session.destroy();
  res.status(204).json(`${nextlink} successfully authenticated.`);
});

/* Login pages */

app.post('/investor/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, INVESTOR, function (err, user, code) {
    if (err) {
      return next(err)
    } else if (code) {
      res.status(code).json("Bad request.");
    } else if (user) {
      res.status(200).json(`User ${user} successfully authenticated.`);
    } else {
      res.status(403).json(`Authentication failed.`);
    }
  })
});

app.post('/company/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, COMPANY, function (err, user, code) {
    if (err) {
      return next(err)
    } else if (code) {
      res.status(code).json("Bad request.");;
    } else if (user) {
      res.status(200).json(`User ${user} successfully authenticated.`);
    } else {
      res.status(403).json(`Authentication failed.`);
    }
  })
});

app.post('/admin/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, ADMIN, function (err, user, code) {
    if (err) {
      return next(err)
    } else if (code) {
      res.status(code).json("Bad request.");;
    } else if (user) {
      res.status(200).json(`User ${user} successfully authenticated.`);
    } else {
      res.status(403).json(`Authentication failed.`);
    }
  })
});

/* Target page */
app.get('/restricted', restrict, function(req, res, next){
  res.status(200).json(`User ${req.session.user} is in the restricted page.`);
});

/* New functions */
app.post('/auth/register', async function (req, res, next) {
  // Name, email, and hash are the only three required and needed
  if (!req.body.name || !req.body.email || !req.body.password_hash) {
    res.status(401, "Bad request: name, email, and password_hash are required.");
  }
  const { data, error } = await supabase
    .from('users')
    .insert({ name: req.body.name, email: req.body.email, password_hash: req.body.password_hash })
  // Middleware to be written
  console.info(data);
  console.info(error);
  res.send(error ? error : data);
});

app.post('/auth/login', async function (req, res, next) { 
  // Name, email, and hash are the only three required and needed
  if (!req.body.name || !req.body.email || !req.body.password_hash) {
    res.status(401, "Bad request: name, email, and password_hash are required.");
  }
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('email', req.body.email)
    .eq('password_hash', req.body.password_hash);
  // Middleware to be written
  res.send(error ? error : data);
});

app.get('/auth/profile', async function (req, res, next) {
  const { data, error } = await supabase
    .from('users')
    .select();
  // Middleware to be written
  console.info(data);
  res.send(error ? error : data);
});

app.put('/auth/update-profile', async function (req, res, next) {
  console.info(req.body.values);
  const { data, error } = await supabase
    .from('users')
    .update(req.body.values)
    .eq('email', req.body.email)
    .eq('password_hash', req.body.password_hash)
    .select();
  console.info(data);
  res.send(error ? error : data);
});

app.post('/companies', function (req, res, next) {
  res.status(666).json("NOT IMPLEMENTED");
});

app.get('/companies/:id', function (req, res, next) {
  res.status(666).json("NOT IMPLEMENTED");
});

app.post('/investments', function (req, res, next) {
  res.status(666).json("NOT IMPLEMENTED");
});

app.get('/investments/:investor_id', function (req, res, next) {
  res.status(666).json("NOT IMPLEMENTED");
});

/* Listen */
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});