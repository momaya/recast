const axios = require('axios');
const config = require('./config.js');

function reviewMovie(movieName) {
	
	var url="https://api.themoviedb.org/3/search/movie?api_key=b079e3281956f4828176cf7ab807889e&query="+movieName;
	
	return axios.get(url).then(response => {
		results = response.data.results
		
		var card = results[0].id;
		console.log(card);
		
				var url2="https://api.themoviedb.org/3/movie/"+card+"/reviews?api_key=b079e3281956f4828176cf7ab807889e&language=en-US&page=1";
				
		 return axios.get(url2).then(response => {
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
			//console.log(results);
		   const cards = results.slice(0, 10).map(movie => ({
			title: movie.author,
			subtitle: movie.content,
			buttons: [
			  {
				 type: 'web_url',
				 value: movie.url,
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
 });
}

module.exports = reviewMovie;
