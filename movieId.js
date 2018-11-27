const axios = require('axios');

function movieId(movieName) {
	
	var url="https://api.themoviedb.org/3/search/movie?api_key=b079e3281956f4828176cf7ab807889e&query="+movieName;
	
  axios.get(url).then(response => {
	results = response.data.results
    
	var card = results[0].id;
    console.log(card);
	return card;
 });
	
	
}

module.exports = movieId;