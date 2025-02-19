const express = require("express");
const app = express();
const port = 3002;
const SERVICE_KEY = 'SUPABASE_SERVICE_KEY'

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
  if (!req.body || !req.body?.email || !req.body?.description) {
    res.status(401, "Bad request: representative email and description are required.");
  }
  console.info(req.body);
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', req.body?.email)
  const uid = data[0].email
  if (data.length == 0) {
    res.status(400, "user not found");
  }
  else {
    const { data2, error } = await supabase
      .from('companies')
      .insert({ user_id: uid, description: req.body.description })
  }
  // Middleware to be written
  console.info(data);
  console.info(error);
  res.send(error ? error : data);
});

app.get('/companies/:id', async function (req, res, next) {
  const { data, error } = await supabase
    .from('companies')
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