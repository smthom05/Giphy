$(document).ready(function() {

  // Create our array to hold our mascots
  var topics = ["virginia tech hokies", "michigan wolverines", "missouri tigers","colorado buffalos","georgia bulldogs","syracuse orange","alabama crimson tide","arizona state sun devils","oklahoma sooners"]

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

  // Add a click event for the submit button to generate new buttons
  $("#addMascot").on("click", function(){

    // Add a prevent default
    event.preventDefault();

    // Grab and store the mascot-input property value from the button
    var newMascot = $("#mascot-input").val().trim();

    // Confirm we are grabbing the input data
    console.log(newMascot);

    // Push our new mascot value into our topics array
    topics.push(newMascot);

    // Call our renderButtons method to generate the new button
    renderButtons();
  });

  // // Construct our API URL
  // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + mascot + "&limit=10&api_key=dc6zaTOxFJmzC";
  //
  // // Perform our AJAX call
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).done(function(response){
  //
  //   // Confirm we have data from Giphy API
  //   console.log(response);
  //
  // });


  // Generate our Buttons when the page initially loads
  renderButtons();
});
