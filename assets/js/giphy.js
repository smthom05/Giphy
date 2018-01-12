$(document).ready(function() {

  // Create our array to hold our mascots
  var topics = ["virginia tech hokies", "michigan wolverines", "missouri tigers","colorado buffalos","georgia bulldogs","syracuse orange","alabama crimson tide","arizona state sun devils","oklahoma sooners"];

  // _______________ Method to render our buttons to the HTML __________________

  // Create a function that will render our buttons to the HTML
  function renderButtons() {

    // Delete anything in our div holding our buttons
    $("#mascot-buttons").empty();

    // Loop through our all the mascots in our array
    for (var i = 0; i < topics.length; i++) {

      // Generate our buttons with Jquery
      var a = $("<button>");

      // Add a class to all of our mascots
      a.addClass("mascots");

      // Grab the data in the array and assign to our buttons
      a.attr("data-name", topics[i]);

      // Add text to our buttons
      a.text(topics[i]);

      // Append our buttons to the desired div
      $("#mascot-buttons").append(a);

    }
  }
  // ________ Generate new buttons from user input _______________________

  // Add a click event for the submit button to generate new buttons
  $("#add-mascot").on("click", function(event){

    // Add a prevent default
    event.preventDefault();

    // Grab and store the mascot-input property value from the button
    var newMascotButton = $("#mascot-input").val().trim();

    newMascotButton = newMascotButton.toLowerCase();

    // Confirm we are grabbing the input data
    console.log(newMascotButton);

    // Push our new mascot value into our topics array
    topics.push(newMascotButton);

    // Clear out the seach field
    $("#mascot-input").val('');

    // Call our renderButtons method to generate the new button
    renderButtons();
  });

  //________ Function to generate our gifs when button is clicked ___________

  $("#mascot-buttons").on("click", "button", function(event) {

    // Add a prevent default
    event.preventDefault();

    // Empty out previous images in the mascot-images gifDiv
    $("#mascot-images").empty();

    // Get the search term using "THIS" and set it to a new variable
    var mascotName = $(this).attr("data-name");

    // Confirm we are grabbing the button's information
    console.log(mascotName);

    // Construct our URL to search GIPHY for our gifs
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mascotName + "&api_key=dc6zaTOxFJmzC&limit=10";

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
        var mascotImage = $("<img>");

        // Create our gif rating variable
        var rating = results[i].rating;

        // Create a paragraph tag with the rating
        var p = $("<p>").text("Rating: " + rating);

        // Attach the image source to the variable
        mascotImage.attr("src", results[i].images.fixed_height.url);

        // Append all of our information to the gifDiv
        gifDiv.append(p);
        gifDiv.append(mascotImage);

        // Get our images to appear in the html
        $("#mascot-images").prepend(gifDiv);

      }
    });
  });
  // Generate our Buttons when the page initially loads
  renderButtons();
});
