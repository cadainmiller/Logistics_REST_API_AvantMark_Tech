// server.js
// load the things we need
var express = require("express");
var request = require("request");
var ejsLint = require("ejs-lint");
var app = express();

//Sets the public folder as the external file folder
app.use(express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// about Driver
app.get("/driverinfo", function (req, res) {
  var searchDriver = req.query.searchdriver;
  var page = req.query.page;
  console.log(searchDriver);
  request("API LINK" + page + "&query=" + searchDriver, function (
    error,
    response,
    body
  ) {
    if (error) {
      console.log(error);
    } else {
      var data = JSON.parse(body);
      res.render("pages/about_drivers", {
        driverData: data,
        pageNumber: page,
      });
    }
  });
});

app.listen(3000);
console.log("Server Started on Port 3000");
