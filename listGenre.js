const axios = require('axios');

function listGenre() {
 return axios.get(`
https://api.themoviedb.org/3/genre/movie/list?api_key=b079e3281956f4828176cf7ab807889e&language=en-US`).then(response => {
   genres = response.data.genres
   if (genres.length === 0) {
    return [{
     type: 'quickReplies',
     content: {
         title: 'Sorry, but I could not find any results for your request :(',
         buttons: [{ title: 'Start over', value: 'Start over' }],
      },
    }];
   }

   var card = "";
   
   for(var i=0; i<genres.length ; i++) {
	   card+=genres[i].name + "\n" ;
   }
   
   return [
     {
       type: 'text',
       content: "Here's what I found for you!",
     },
     { type: 'text', content: card },
   ];
 });
}

module.exports = listGenre;