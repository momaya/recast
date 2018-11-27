const axios = require('axios');
const config = require('./config.js');

function popularMovie() {
 return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b079e3281956f4828176cf7ab807889e&language=en-US&page=1`).then(response => {
   results = response.data.results
   if (results.length === 0) {
    return [{
     type: 'quickReplies',
     content: {
         title: 'Sorry, but I could not find any results for your request :(',
         buttons: [{ title: 'Start over', value: 'Start over' }],
      },
    }];
   }

   const cards = results.slice(0, 10).map(movie => ({
    title: movie.title || movie.name,
    subtitle: movie.overview,
    imageUrl: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
    buttons: [
      {
         type: 'web_url',
         value: `https://www.themoviedb.org/movie/${movie.id}`,
         title: 'View More',
       },
     ],
   }));

   return [
     {
       type: 'text',
       content: "Here's what I found for you!",
     },
     { type: 'carousel', content: cards },
   ];
 });
}

module.exports = popularMovie;