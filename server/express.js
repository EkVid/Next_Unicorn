var express = require("express");
var app = express();
var port = 8000;
var path = require('node:path');
var hash = require('pbkdf2-password')();
var session = require('express-session');
/* Connect to DB */
// const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgres://uidname:password@host:port/database')
/* Dummy function for testing out skeleton code */
var circle = require("./circle");
app.get("/circle/:radius", function (req, res) {
    res.send("A circle of radius ".concat(req.params.radius, " units has perimeter ").concat(circle.perimeter(req.params.radius), " units and ").concat(circle.area(req.params.radius), " square units."));
});
/* Mock for building middleware */
app.use(express.urlencoded());
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'The Next Unicorn'
}));
app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err)
        res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg)
        res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});
/* Mock for login */
var INVESTOR = 1;
var COMPANY = 2;
var ADMIN = 0;
var users = {
    Mack: { name: 'Mack', type: INVESTOR },
    Carol: { name: 'Carol', type: COMPANY },
    Alice: { name: 'Alice', type: ADMIN }
};
hash({ password: 'fizzbuzz' }, function (err, pass, salt, hash) {
    if (err)
        throw err;
    users.Mack.salt = salt;
    users.Mack.hash = hash;
});
hash({ password: 'foobar' }, function (err, pass, salt, hash) {
    if (err)
        throw err;
    users.Carol.salt = salt;
    users.Carol.hash = hash;
});
hash({ password: 'omgzer' }, function (err, pass, salt, hash) {
    if (err)
        throw err;
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
    else if ((user === null || user === void 0 ? void 0 : user.type) != type) {
        console.info("User %s of type %d does not match type %d", name, user === null || user === void 0 ? void 0 : user.type, type);
        return fn(null, null);
    }
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
        if (err)
            return fn(err);
        if (hash === user.hash)
            return fn(null, user);
        fn(null, null);
    });
}
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        req.session.error = 'Access denied!';
        res.json(403, "Restricted!");
    }
}
app.get('/logout', function (req, res) {
    var _a, _b, _c;
    // destroy the user's session to log them out
    // will be re-created next request
    var nextlink = 'investor';
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.user)) {
        res.json(201, "Already logged out");
        return;
    }
    switch ((_c = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.type) {
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
    res.json(204, "".concat(nextlink, " successfully authenticated."));
});
/* Login pages */
function setauthenticate(err, user, req, res, next) {
    if (err)
        return next(err);
    if (user) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function () {
            // Store the user's primary key
            // in the session store to be retrieved,
            // or in this case the entire user object
            req.session.user = user;
            req.session.success = 'Authenticated as ' + user.name + '.';
            res.json(200, "User ".concat(req.session.user, " successfully authenticated."));
        });
    }
    else {
        req.session.error = 'Authentication failed.';
        res.json(403, "Authentication failed.");
        res.redirect('/restricted');
    }
}
app.post('/investor/login', function (req, res, next) {
    authenticate(req.body.username, req.body.password, INVESTOR, function (err, user, next) {
        setauthenticate(err, user, req, res, next);
    });
});
app.post('/company/login', function (req, res, next) {
    authenticate(req.body.username, req.body.password, COMPANY, function (err, user, next) {
        setauthenticate(err, user, req, res, next);
    });
});
app.post('/admin/login', function (req, res, next) {
    authenticate(req.body.username, req.body.password, ADMIN, function (err, user, next) {
        setauthenticate(err, user, req, res, next);
    });
});
/* Target page */
app.get('/restricted', restrict, function (req, res) {
    console.log(req.session);
    res.json(200, "User ".concat(req.session.user, " is in the restricted page."));
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port, "!"));
});
