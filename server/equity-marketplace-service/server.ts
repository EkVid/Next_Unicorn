const express = require("express");
const app = express();
const port = 3002;
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

/* New functions */
app.post('/companies', async function (req, res, next) {
  // Name, email, and hash are the only three required and needed
  if (!req.body || !req.body?.email || !req.body?.password_hash || !req.body?.description) {
    res.status(400, "Bad request: representative email and description are required.");
  }
  console.info(1, req.body);
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', req.body?.email)
    .eq('password_hash', req.body?.password_hash)
  if (data.length === 0) {
    res.status(404, "user not found");
  }
  else {
    console.info(data[0]);
    req.body.user_id = data[0].id;
    next();
  }
  // Middleware to be written
  res.send(error ? error : data);
}, async function (req, res, next) {
  console.info(2, req.body);
  const { data, error } = await supabase
      .from('companies')
      .insert({ user_id: req.body.user_id, description: req.body?.description })
      .select();
  console.info(data);
  console.info(error);
});

app.get('/companies/:id', async function (req, res, next) {
  // Obtain company info by ID.
  const { data, error } = await supabase
    .from('companies')
    .select()
    .eq('id', req.params.id);
  // Middleware to be written
  console.info(data);
  res.send(error ? error : data);
});

app.post('/investments', async function (req, res, next) {
  // Name, email, and hash are the only three required and needed
  if (!req.body || !req.body?.email || !req.body?.password_hash || !req.body?.company_id || !req.body?.amount) {
    res.status(400, "Bad request: email with password, company ID, and amount required.");
  }
  console.info(1, req.body);
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', req.body?.email)
    .eq('password_hash', req.body?.password_hash)
  if (data.length === 0) {
    res.status(404, "user not found");
  }
  else {
    console.info(data[0]);
    req.body.user_id = data[0].id;
    next();
  }
  // Middleware to be written
  res.send(error ? error : data);
}, async function (req, res, next) {
  console.info(2, req.body);
  const { data, error } = await supabase
      .from('investments')
      .insert({ investor_id: req.body.user_id, company_id: req.body?.company_id, amount: req.body?.amount })
      .select();
  console.info(data);
  console.info(error);
});

app.get('/investments/:id', async function (req, res, next) {
  // Obtain company info by ID.
  const { data, error } = await supabase
    .from('investments')
    .select()
    .eq('id', req.params.id);
  // Middleware to be written
  console.info(data);
  res.send(error ? error : data);
});

/* Listen */
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});