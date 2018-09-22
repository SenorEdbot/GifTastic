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
    $('#gifDiv').empty();
    //store the button that was clicked in the SearchTerm
    searchTerm = $(this).attr('sport');
    API_KEY = 'wTP5c5YxtAnD8rfw628rBukV86aykclF';

    //Returns 10 searchs with the search term that are g or pg
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=10&rating=pg`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        //For loop to loop through all the different objects in the data array
        for (var i=0; i<response.data.length; i++) {
            var newCard = $('<div class="card">').addClass("gifCards");
            var cardImg = $('<img class="card-img-top">').attr('static-url',response.data[i].images.fixed_height_still.url).attr('dynamic-url',response.data[i].images.fixed_width.url).attr('isstatic','true');
            cardImg.attr('src',cardImg.attr('static-url'));
            var cardBody = $('<div class="card-body">');
            var cardp = $('<p class="card-text">').text("Rating: " + response.data[i].rating);
            cardBody.append(cardp);
            newCard.append(cardImg,cardBody);
            $('#gifDiv').append(newCard);
        }
    });

    $(document).on('click', '.card-img-top', function(event){
        if($(this).attr('isstatic')==='false'){
            $(this).attr('src',$(this).attr('static-url'));
            $(this).attr('isstatic', 'true');
        } else {
            $(this).attr('src',$(this).attr('dynamic-url'));
            $(this).attr('isstatic', 'false');
        };
    });
});