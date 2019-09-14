      // Initial array of movies
      var movies = ["Celtics", "Sixers", "Knicks", "Nets"];//needs to be longer and actually add

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var team = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          team + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          console.log(response)
          for (var i = 0; i < 10; i++) {
            // response.data.length
            // Creating a div to hold the movie
            var teamDiv = $("<div class='team'>");

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an element to have the rating displayed

            var pOne = $("<p>").text("Rating: " + rating);


            console.log(pOne)
            // Displaying the rating
            teamDiv.append(pOne);

            var stillURL = response.data[i].images.fixed_height_still.url;
            var animateURL = response.data[i].images.fixed_height.url
              ;//images.fixed_height.url
            console.log(stillURL);
            console.log(animateURL);
            // Creating an element to hold the image
            //readnotes: make argument seperate variable
            var image = $("<img>").attr("src", stillURL);



            image.attr("class", "gif");

            image.attr("data-still", stillURL);
            image.attr("data-animate", animateURL);
            image.attr("data-state", 'still');

            // Appending the image
            teamDiv.append(image);

            // Putting the entire movie above the previous movies
            $("#team-view").prepend(teamDiv);
          }
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("team-btn");
          // Adding a data-attribute
          a.attr("data-name", movies[i]);
          // Providing the initial button text
          a.text(movies[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-team").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();
// console.log(movie)
        // Adding movie from the textbox to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // $("#team-movie").on("click", function(event) {
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


        console.log("ran off of a click")

      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".team-btn", displayMovieInfo);
      // $(document).on("click", '.parentOfInfo > .gif', animateImage);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

