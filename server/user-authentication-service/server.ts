const express = require("express");
const app = express();
const port = 3001;
const SERVICE_KEY = 'SUPABASE_SERVICE_KEY'

var path = require('node:path');
var session = require('express-session');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

/* Connect to DBs */
const sjs = require('@supabase/supabase-js');
const supabaseUrl = 'https://bxlkrekpshmetjmsuapm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is not defined");
}
const supabase = sjs.createClient(supabaseUrl, supabaseKey);

/* API calls */
app.post('/auth/register', async function (req, res, next) {
  // Name, email, and hash are the only three required and needed
  if (!req.body?.name || !req.body?.email || !req.body?.password_hash) {
    res.status(401, "Bad request: name, email, and password_hash are required.");
  }
  const { data, error } = await supabase
    .from('users')
    .insert({ name: req.body?.name, email: req.body?.email, password_hash: req.body?.password_hash })
    .select();
  // Middleware to be written
  console.info(data);
  res.send(error ? error : data);
});

app.post('/auth/login', async function (req, res, next) {
  // Name, email, and hash are the only three required and needed
  if (!req.body?.name || !req.body?.email || !req.body?.password_hash) {
    res.status(401, "Bad request: name, email, and password_hash are required.");
  }
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('email', req.body?.email)
    .eq('password_hash', req.body?.password_hash);
  // Middleware to be written
  console.info(data);
  res.send(error ? error : data);
});

app.get('/auth/profile', async function (req, res, next) {
  // Right now it displays all the user profiles
  const { data, error } = await supabase
    .from('users')
    .select();
  // Middleware to be written
  console.info(data);
  res.send(error ? error : data);
});

app.put('/auth/update-profile', async function (req, res, next) {
  // Uses the values JSON to update
  console.log(req.body.values)
  const { data, error } = await supabase
    .from('users')
    .update(req.body?.values)
    .eq('email', req.body?.email)
    .eq('password_hash', req.body?.password_hash)
    .select();
  // Middleware to be written
  console.info(data);
  res.send(error ? error : data);
});

/* Listen */
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});