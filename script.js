console.log("Hello")
var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");
var submitBtn = document.getElementById("submitBtn");
var closeSearchBtn = document.getElementById("closeSearchBtn");
var movieDiv = document.getElementById("movieDiv");

//function to display result based on search
submitBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission (optional)

    try {
        const apiKey = "26a8b5e8111d2b3fd500afd21defd060";
        const searchTerm = searchInput.value;
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}`; //searchTerm is what is taken in from the user's input

        const response = await fetch(url); // response is a string. "{movies: ["tile": "John Wick"]}"
        const container = await response.json();
        const movie_temp = container.results;

        movieDiv.innerHTML = ''; //clears prev movie cards

        movie_temp.forEach(movie => {
            const movieCard = document.createElement("div"); //creates a Div element in (thru js) for each movie card
            movieCard.classList.add("movie-card"); //adds a class to be accessed and styled
      
            const img = document.createElement("img"); //creates img element dynamically in js
            img.classList.add("movie-poster"); // makes the class for img in CSS to be accessed as movie-poster

            const path = "http://image.tmdb.org/t/p/w154"
            img.src = path + movie.poster_path;
            //img.classList.add("movies-grid"); //Implement grid layout, update CSS
            movieCard.appendChild(img); // Step 3: Add the image url to the moviesDiv

            const title = document.createElement("h3");
            title.classList.add("movie-title");
            title.textContent = movie.title;
            movieCard.appendChild(title);
      
            const votes = document.createElement("p");
            votes.classList.add("movie-votes");
            votes.textContent = `Votes: ${movie.vote_count}`;
            movieCard.appendChild(votes);
      
            movieDiv.appendChild(movieCard);
        });

        console.log(container);
        // Process the data returned from the API
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.log(error);
    }

    // Perform your desired action here
    console.log("Button clicked!");
})


closeSearchBtn.addEventListener("click", () => {
    displayAllPictures();
  });

// Function to display all pictures by default
async function displayAllPictures() {
    try {
      const apiKey = "26a8b5e8111d2b3fd500afd21defd060";
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
  
      const response = await fetch(url);
      const container = await response.json();
      const movie_temp = container.results;

      movieDiv.innerHTML = '';

      const moviesGrid = document.createElement("div"); //making the default page have the movies grid in a div
      moviesGrid.id = "movies-grid";

      movie_temp.forEach(movie => {
        const movieCard = document.createElement("div"); //Each movie will have its movie card in a div
        movieCard.classList.add("movie-card");           //creating a class for the cards to have a generic edit

        const img = document.createElement("img");       
        img.classList.add("movie-poster");               //img container storing the poster and having a class to edit generically
        const path = "http://image.tmdb.org/t/p/w154";
        img.src = path + movie.poster_path;
        movieCard.appendChild(img);                     // Step 3: Add the image url to the moviesCard div

        // img.classList.add("movies-grid"); //Implement grid layout, update CSS
        // movieCard.appendChild(img); // Step 3: Add the image url to the moviesDiv

        const title = document.createElement("h3");     //new h3 element for title
        title.classList.add("movie-title");             //edit all titles in same class
        title.textContent = movie.title;                //source the titles from the results
        movieCard.appendChild(title);                   //add each title to each card
  
        const votes = document.createElement("p");      //do same for votes
        votes.classList.add("movie-votes");
        votes.textContent = `Votes: ${movie.vote_count}`;
        movieCard.appendChild(votes);

        moviesGrid.appendChild(movieCard);              //append each card(with complete detail) to the Grids
      });
  
      movieDiv.appendChild(moviesGrid);                 //fit all complete grids into the div
      console.log(container);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Call the displayAllPictures function to show all pictures by default
  displayAllPictures();