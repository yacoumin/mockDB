# mockDB
A mock database for the Awk application

The database is hosted on [mockawk.herokuapp.com] (https://mockawk.herokuapp.com)


## Routes
`GET /movies`

returns a json object of the form {"movieList" : [{movie1},{movie2}]}

`GET /movies/:id`

returns a json object of the form {movie}, where movie is an object containing attributes like "title" and "plotSummary"

`GET /search/:searchText`

returns a json object similar to the "/movies" route, but only containing movies with titles that contain 
:searchText (case insensitive)
