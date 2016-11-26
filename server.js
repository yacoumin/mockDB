var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.listen(port);
var movies = require('./data/movies.json')

// allow easy lookup by id
var moviesById = {}
var moviesList;
movies.movieList.map(function(movie) {
  moviesById[movie.movieId] = movie
})
moviesList = Object.keys(moviesById);

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
