const options = {
    mode:'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
}

export function fetchGifs(query,pageNo=1){
    const searchApiUrl = `https://pixabay.com/api/?key=14707755-90fb386dd29d2acdb51ddd3b6&q=${encodeURIComponent(query)}&per_page=5&page=${pageNo}`;
    // const trendingApiUrl = `https://api.giphy.com/v1/gifs/trending?api_key=kEjF8Ju5OVxPvR6hLztbkbeWFikeyGUe&limit=5&offset=0&rating=G`;

    return fetch(searchApiUrl,options).then(
        function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            // Examine the text in the response
            return response.json();
          }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}