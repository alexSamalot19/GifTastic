// Initial array of NBA teams: it is recommended to use the city as well
var topics = ["Celtics", "Sixers", "Knicks", "Nets", "Utah Jazz", "Miami Heat"];

// displayTeamInfo function re-renders the HTML to display the appropriate content
function displayTeamInfo() {

  var team = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    team + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  // Creating an AJAX call for the specific NBA Team button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    for (var i = 0; i < 10; i++) {
      // response.data.length could also be used

      // Creating a div to hold the team
      var teamDiv = $("<div class='team'>");

      // Storing the rating data
      var rating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);


      console.log(pOne)
      // Displaying the rating
      teamDiv.append(pOne);

      var stillURL = response.data[i].images.fixed_height_still.url;
      var animateURL = response.data[i].images.fixed_height.url;

      // console.log(stillURL);
      // console.log(animateURL);

      // Creating an element to hold the image
      var image = $("<img>").attr("src", stillURL);
      //Set image attributes
      image.attr("class", "gif");
      image.attr("data-still", stillURL);
      image.attr("data-animate", animateURL);
      image.attr("data-state", 'still');

      // Prepending the image
      teamDiv.prepend(image);

      // Putting the entire team above the previous teams
      $("#team-view").prepend(teamDiv);
    }
  });

}

// Function for displaying team data
function renderButtons() {

  // Deleting the teams prior to adding new teams
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of teams
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each team in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of team-btn to our button
    a.addClass("team-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a team button is clicked
$("#add-team").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var teamVar = $("#team-input").val().trim();

  // Adding team from the textbox to our array
  topics.push(teamVar);

  // Calling renderButtons which handles the processing of our team array
  renderButtons();
});

//Event handler/click listener for the gifs to animate or pause
$(document.body).on('click', ".gif", function () {
  event.preventDefault();
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
  // console.log("ran off of a click")

});

// Adding a click event listener to all elements with a class of "team-btn"
$(document).on("click", ".team-btn", displayTeamInfo);


// Calling the renderButtons function to display the intial buttons
renderButtons();

