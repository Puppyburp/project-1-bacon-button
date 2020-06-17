var city = "";
var lat = "";
var long = "";
var restaurantName = "";
var rating = "";
var restaurantAddress = "";
var restaurantImage = "";


// // on click event 
$("#search-button").on("click", function(event){
    event.preventDefault();
    getRestaurants()
  
  });


function getRestaurants (){
    $(".restaurants-list").empty();

// pulling the input info 
  city = $("#city-search").val();

// Geolocation API 
  var coordinates = {
    "async": true,
    "crossDomain": true,
    "url": "https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address="+ city,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
      "x-rapidapi-key": "f510b13455msh5aa62116ab510c8p1c9960jsn360a187cc4c2"
    }
  }

    $.ajax(coordinates).done(function (response) {
      console.log(response);
      lat = response.results[0].geometry.location.lat;
      long = response.results[0].geometry.location.lng;

      console.log(lat);
      console.log(long);

// Restaurants API
    var restaurants = {
      "async": true,
      "crossDomain": true,
      "url": "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=2&currency=USD&restaurant_dining_options=barbecue&restaurant_styles=barbecue&combined_food=bacon&distance=2&restaurant_tagcategory=barbecue&restaurant_mealtype=barbecue&lunit=km&lang=en_US&latitude="+lat+"&longitude="+long,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "f510b13455msh5aa62116ab510c8p1c9960jsn360a187cc4c2"
      }
    }

    $.ajax(restaurants).done(function (response) {
      console.log(response);

      var results = response.data

// Loop to display restaurants 
      for (var i = 0; i < results.length; i++){

        restaurantName = response.data[i].name;
        restaurantAddress = response.data[i].address;
        rating = response.data[i].rating;
       

        console.log(restaurantName);
        console.log(restaurantAddress);
        console.log(rating);
        console.log(restaurantImage);

        var restaurantNameDisplay = $("<h4>").text(restaurantName);
        var restaurantAddressDisplay = $("<p>").text("Address: " + restaurantAddress);
        var ratingDisplay = $("<p>").text("Rating: " + rating);


        var card = $("<div>").addClass("cardTwo");
        var cardBody = $("<div>").addClass("card-body");

        $(card).append(restaurantNameDisplay, restaurantAddressDisplay, ratingDisplay);
        $(card).append(cardBody);
        $(".restaurants-list").append(card)

      }

    });

  });

};
