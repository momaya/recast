const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const discoverMovie = require('./discoverMovie.js');
const popularMovie = require('./popularMovie.js');
const topRatedMovie = require('./topRatedMovie.js');
const upComingMovie = require('./upComingMovie.js');
const nowPlayingMovie = require('./nowPlayingMovie.js');
const listGenre = require('./listGenre.js');
const reviewMovie = require('./reviewMovie.js');
const releaseDate = require('./releaseDate.js');
const movieId = require('./movieId.js');

const app = express();
app.use(bodyParser.json());


app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 
});

//Discover Movies

app.post('/discover-movies', (req, res) => {
  console.log('[POST] /discover-movies');
  const memory = req.body.conversation.memory;
  const movie = memory.movie;
  const tv = memory.tv;

  const kind = movie ? 'movie' : 'tv';

  const genre = memory.genre;
  const genreId = getGenreId(genre.value);

 
  return discoverMovie(kind, genreId)
    .then((carouselle) => res.json({
     replies: carouselle,
    }))
    .catch((err) => console.error('error: ', err));
 });
 
 //Review Movies

app.post('/review-movies', (req, res) => {
  
  const memory = req.body.conversation.memory;
  const movieName = memory.moviename.raw;
  console.log(movieName); 
  console.log('[GET] /review-movies');
  return reviewMovie(movieName)
    .then((carouselle) => res.json({
     replies: carouselle,
    }))
    .catch((err) => console.error(' error: ', err));
 });
 
 //Popular Movies
 
 app.post('/popular-movies', (req, res) => {
  console.log('[POST] /popular-movies');
   
  return popularMovie()
    .then((carouselle) => res.json({
     replies: carouselle,
    }))
    .catch((err) => console.error('error: ', err));
 });
 
 //Top Rated Movies
  
 app.post('/top-rated-movies', (req, res) => {
  console.log('[POST] /top-rated-movies');
   
  return topRatedMovie()
    .then((carouselle) => res.json({
     replies: carouselle,
    }))
    .catch((err) => console.error(' error: ', err));
 });
 
 //Up Coming Movies
  
 app.post('/upComing-movies', (req, res) => {
  console.log('[POST] /upComing-movies');
   
  return upComingMovie()
    .then((carouselle) => res.json({
     replies: carouselle,
    }))
    .catch((err) => console.error(' error: ', err));
 });
 
 //Now Playing Movies
  
 app.post('/nowPlaying-movies', (req, res) => {
  console.log('[POST] /nowPlaying-movies');
   
  return nowPlayingMovie()
    .then((carouselle) => res.json({
     replies: carouselle,
    }))
    .catch((err) => console.error(' error: ', err));
 });
 
 //List Genre
  
 app.post('/listGenre', (req, res) => {
  console.log('[POST] /listGenre');
   
  return listGenre()
    .then((text) => res.json({
     replies: text,
    }))
    .catch((err) => console.error(' error: ', err));
 });
 
 //Release Date
  
 app.post('/release-date', (req, res) => {
	 
	  const memory = req.body.conversation.memory;
	  const movieName = memory.moviename.value;
	  console.log('[GET] /release-date');
	  console.log(movieName);
  return releaseDate(movieName)
    .then((text) => res.json({
     replies: text,
    }))
    .catch((err) => console.error(' error: ', err));
 });

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`));

const movieGenres = [
   { id: 12, name: 'Adventure' },
   { id: 14, name: 'Fantasy' },
   { id: 16, name: 'Animated' },
   { id: 16, name: 'Animation' },
   { id: 18, name: 'Drama' },
   { id: 27, name: 'Horror' },
   { id: 28, name: 'Action' },
   { id: 35, name: 'Comedy' },
   { id: 36, name: 'History' },
   { id: 37, name: 'Western' },
   { id: 53, name: 'Thriller' },
   { id: 80, name: 'Crime' },
   { id: 99, name: 'Documentary' },
   { id: 878, name: 'SF' },
   { id: 878, name: 'Sci Fi' },
   { id: 878, name: 'Sci-Fi' },
   { id: 878, name: 'Science Fiction' },
   { id: 9648, name: 'Mystery' },
   { id: 10402, name: 'Music' },
   { id: 10749, name: 'Romance' },
   { id: 10749, name: 'Romantic' },
   { id: 10751, name: 'Family' },
   { id: 10752, name: 'War' },
   { id: 10770, name: 'TV Movie' },
];

// Find the moviedb id of a genre entity
function getGenreId(genre) {
   const row = movieGenres.find(function(elem) {
    return elem.name.toLowerCase() === genre.toLowerCase();
   });

   if (row) {
    return row.id;
   }
   return null;
}