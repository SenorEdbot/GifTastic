var topics = [
    'soccer',
    'football',
    'baseball',
    'tennis',
    'rugby',
    'wrestling',
    'cross country',
    'track and field',
    'softball',
    'cricket',
    'badminton',
    'basketball',
    'volleyball',
    'boxing',
    'archery',
    'diving',
    'golf',
    'fencing',
    'lacrosse',
    'weightlifting'
];
var searchTerm;

for (var i=0; i<topics.length; i++) {
    var newB = $('<button>').addClass('buttons').attr('sport', topics[i]).text(topics[i]);
    $('#topicButtons').append(newB);    
}

$(document).on('click','.buttons', function(){
    //store the button that was clicked in the SearchTerm
    searchTerm = $(this).attr('sport');
    API_KEY = 'wTP5c5YxtAnD8rfw628rBukV86aykclF';

    //Returns 10 searchs with the search term
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=10`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
})