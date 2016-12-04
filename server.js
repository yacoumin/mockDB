var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;
app.listen(port);
var movies = require('./data/movies.json')
var usersDB = require('./data/users.json')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

var users = {};
var moviesById = {};
var moviesList;
movies.movieList.map(function(movie) {
  moviesById[movie.movieId] = movie
})
moviesList = Object.keys(moviesById);

usersDB.users.map(function(user) {
  users[user.name] = user;
})
// app.use(express.static('public'));

app.get("/movies", function(req,res) {
  res.send(movies);
})
app.get("/search/:searchText", function(req,res) {
  var pattern = new RegExp(req.params.searchText, "i");
  var result = {"movieList" : []};
  var curr;
  for (var i=0; i < moviesList.length; i++) {
    curr = moviesById[moviesList[i]];
    if (pattern.test(curr.title)) {
      result["movieList"].push(curr);
    }
  }
  if (result["movieList"].length > 0) {
    res.send(result);
  }
  else {
    res.status(404).send("No movies found");
  }

});

app.get("/movies/:id", function(req,res) {
  var result = moviesById[req.params.id];
  if (result) {
    res.send(result);
  }
  else {
    res.status(404).send("no movies found")
  }
});

app.post("/users/create", function(req,res) {
  var user = req.body.userinfo;
  console.log(user);
  users[user.name] = user;
  usersDB.users.push(user);
  fs.writeFile('./data/users.json', JSON.stringify(usersDB), function (err) {
    if (err) return console.log(err);
    console.log('writing to usersDB');
  });
  res.sendStatus(200);
});

app.post("/customize/:userid", function(req,res) {

});

app.get("/users", function(req,res) {
  res.sendFile(__dirname + "/data/users.json")
});
