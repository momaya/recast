const axios = require('axios');

function releaseDate(movieName) {
	
	
	var url="https://api.themoviedb.org/3/search/movie?api_key=b079e3281956f4828176cf7ab807889e&query="+movieName;
	
	return axios.get(url).then(response => {
		results = response.data.results
		
		var card = results[0].id;
		console.log(card);
		
				var url2="https://api.themoviedb.org/3/movie/"+card+"/release_dates?api_key=b079e3281956f4828176cf7ab807889e";
			
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
		 
			var card = "";
		   
		   for(var i=0; i<results.length ; i++) {
			   
			   card+=results[i].iso_3166_1 + " ";
			   card+=results[i].release_dates[0].release_date.substring(0,10) + "\n\n" ;
		   }
		 
			return [
			 {
			   type: 'text',
			   content: "Here's what I found for you!",
			 },
			 { type: 'text', content: card },
		   ];
		 });
	 });
	
	
}

module.exports = releaseDate;
