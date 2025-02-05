const express = require("express");
const app = express();
const port = 8000;

const circle = require("./circle");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/circle/:radius", function (req, res) {
  res.send(`A circle of radius ${req.params.radius} units has perimeter ${circle.perimeter(req.params.radius)} units and ${circle.area(req.params.radius)} square units.`);
});

/* TODO */
app.get("/investor/:radius", function (req, res) {
  res.send(`A circle of radius ${req.params.radius} units has perimeter ${circle.perimeter(req.params.radius)} units and ${circle.area(req.params.radius)} square units.`);
});

/* TODO */
app.get("/company/:radius", function (req, res) {
  res.send(`A circle of radius ${req.params.radius} units has perimeter ${circle.perimeter(req.params.radius)} units and ${circle.area(req.params.radius)} square units.`);
});

/* TODO */
app.get("/admin/:radius", function (req, res) {
  res.send(`A circle of radius ${req.params.radius} units has perimeter ${circle.perimeter(req.params.radius)} units and ${circle.area(req.params.radius)} square units.`);
});


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});