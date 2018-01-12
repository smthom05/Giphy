$(document).ready(function() {

  // Create our array to hold our teams
  var topics = ["virginia tech hokies", "michigan wolverines", "missouri tigers","colorado buffalos","georgia bulldogs","syracuse orange","alabama crimson tide","arizona state sun devils","oklahoma sooners"];

  // _______________ Method to render our buttons to the HTML __________________

  // Create a function that will render our buttons to the HTML
  function renderButtons() {

    // Delete anything in our div holding our buttons
    $("#team-buttons").empty();

    // Loop through our all the teams in our array
    for (var i = 0; i < topics.length; i++) {

      // Generate our buttons with Jquery
      var a = $("<button>");

      // Add a class to all of our teams
      a.addClass("teams");

      // Grab the data in the array and assign to our buttons
      a.attr("data-name", topics[i]);

      // Add text to our buttons
      a.text(topics[i]);

      // Append our buttons to the desired div
      $("#team-buttons").append(a);

    }
  }
  // ________ Generate new buttons from user input _______________________

  // Add a click event for the submit button to generate new buttons
  $("#add-team").on("click", function(event){

    // Add a prevent default
    event.preventDefault();

    // Grab and store the team-input property value from the button
    var newTeamButton = $("#team-input").val().trim();

    newTeamButton = newTeamButton.toLowerCase();

    // Confirm we are grabbing the input data
    console.log(newTeamButton);

    // Push our new team value into our topics array
    topics.push(newTeamButton);

    // Clear out the seach field
    $("#team-input").val('');

    // Call our renderButtons method to generate the new button
    renderButtons();
  });

  //________ Function to generate our gifs when button is clicked ___________

  $("#team-buttons").on("click", "button", function(event) {

    // Add a prevent default
    event.preventDefault();

    // Empty out previous images in the team-images gifDiv
    $("#team-images").empty();

    // Get the search term using "THIS" and set it to a new variable
    var teamName = $(this).attr("data-name");

    // Confirm we are grabbing the button's information
    console.log(teamName);

    // Construct our URL to search GIPHY for our gifs
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + teamName + "&api_key=dc6zaTOxFJmzC&limit=10";

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
        var teamImage = $("<img>");

        // Create our gif rating variable
        var rating = results[i].rating;

        // Create a paragraph tag with the rating
        var p = $("<p>").text("Rating: " + rating);

        // Attach the image source to the variable
        teamImage.attr("src", results[i].images.fixed_height.url);

        // Append all of our information to the gifDiv
        gifDiv.append(p);
        gifDiv.append(teamImage);

        // Get our images to appear in the html
        $("#team-images").prepend(gifDiv);

      }
    });
  });
  // Generate our Buttons when the page initially loads
  renderButtons();
});
