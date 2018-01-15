$(document).ready(function() {

  // Create our array to hold our shows
  var topics = ["the office", "friends", "seinfeld","how I met your mother","it's always sunny in philadelphia","arrested development","flight of the concords","stranger things","parks and rec", "curb your enthusiasm"];

  // _______________ Method to render our buttons to the HTML __________________

  // Create a function that will render our buttons to the HTML
  function renderButtons() {

    // Delete anything in our div holding our buttons
    $("#show-buttons").empty();

    // Loop through our all the shows in our array
    for (var i = 0; i < topics.length; i++) {

      // Generate our buttons with Jquery
      var a = $("<button>");

      // Add a class to all of our shows
      a.addClass("shows");

      // Grab the data in the array and assign to our buttons
      a.attr("data-name", topics[i]);

      // Add text to our buttons
      a.text(topics[i]);

      // Append our buttons to the desired div
      $("#show-buttons").append(a);

    }
  }
  // ________ Generate new buttons from user input _______________________

  // Add a click event for the submit button to generate new buttons
  $("#add-show").on("click", function(event){

    // Add a prevent default
    event.preventDefault();

    // Grab and store the show-input property value from the button
    var newshowButton = $("#show-input").val().trim();

    newshowButton = newshowButton.toLowerCase();

    // Confirm we are grabbing the input data
    console.log(newshowButton);

    // Push our new show value into our topics array
    topics.push(newshowButton);

    // Clear out the seach field
    $("#show-input").val('');

    // Call our renderButtons method to generate the new button
    renderButtons();
  });

  //________ Function to generate our gifs when button is clicked ___________

  $("#show-buttons").on("click", "button", function(event) {

    // Add a prevent default
    event.preventDefault();

    // Empty out previous images in the show-images gifDiv
    $("#show-images").empty();

    // Get the search term using this and set it to a new variable
    var showName = $(this).attr("data-name");

    // Confirm we are grabbing the button's information
    console.log(showName);

    // Construct our URL to search GIPHY for our gifs
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + showName + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Perform our AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){

      // Confirm we have data from GIPHY API
      console.log(response);

      // Storing our response array in a variable called results
      var results = response.data;

      // Looping through over every result item
      for (i = 0; i < results.length; i++) {

        // Create a div for our gifs
        var gifDiv = $("<div>");

        // Create our Image tags
        var showImage = $("<img>");

        // Add class to gifs
        gifDiv.addClass("gifs");

        // Create our gif rating variable
        var rating = results[i].rating;

        // Create a paragraph tag with the rating
        var p = $("<p>").text("Rating: " + rating);

        // Attach both the still and animated data-state URLs
        showImage.attr("data-state", "still");
        showImage.attr("src", results[i].images.fixed_height_still.url);
        showImage.attr("data-still", results[i].images.fixed_height_still.url);
        showImage.attr("data-animate", results[i].images.fixed_height.url);


        // Append all of our information to the gifDiv
        gifDiv.append(p);
        gifDiv.append(showImage);

        // Get our images to appear in the html
        $("#show-images").prepend(gifDiv);

      }
    });
  });

  // Generate our still and animate features on click
  $("#show-images").on("click", ".gifs", function(event){

    event.preventDefault();

    // Get our data-state stored in a variable
    var state = $(this).attr("data-state");
    var animateUrl = $(this).attr("data-animate");
    var stillUrl = $(this).attr("data-still");

    // Create our if/else statement for the data-state of the gifs
    if (state === "still") {
      $(this).attr("src", animateUrl).attr("data-state", "animate");

    } else {
      $(this).attr("src", stillUrl).attr("data-state", "still");
    };

  });

  // Generate our Buttons when the page initially loads
  renderButtons();
});
