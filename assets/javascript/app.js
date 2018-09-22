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

var generateButtons = function(){
    $('#topicButtons').empty();
    for (var i=0; i<topics.length; i++) {
        var newB = $('<button>').addClass('buttons').attr('sport', topics[i]).text(topics[i]);
        $('#topicButtons').append(newB);    
    }
}
generateButtons();

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
            var cardImg = $('<img class="card-img-top">').attr('static-url',response.data[i].images.fixed_height_still.url).attr('dynamic-url',response.data[i].images.fixed_width.url).attr('data-state','static').attr('isfav','false');
            cardImg.attr('src',cardImg.attr('static-url'));
            var cardBody = $('<div class="card-body">');
            var cardp = $('<p class="card-text">').text("Rating: " + response.data[i].rating);
            var cardp2 = $('<p class="card-text">').text("Title: " + response.data[i].title);
            cardBody.append(cardp2,cardp);
            newCard.append(cardImg,cardBody);
            $('#gifDiv').append(newCard);
        }
    });

});
//On Click Listener that will play and pause the gifs
$(document).off('click', '.card-img-top').on('click', '.card-img-top', function (event) {
    var state = $(this).attr('data-state');
    if (state === 'static') {
        $(this).attr('src', $(this).attr('dynamic-url'));
        $(this).attr('data-state', 'dynamic');
    } else {
        $(this).attr('src', $(this).attr('static-url'));
        $(this).attr('data-state', 'static');
    };
});
$('#add-sport').on('click', function(){
    event.preventDefault();
    topics.push($('#gif-input').val().trim());
    generateButtons();
})