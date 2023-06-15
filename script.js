console.log("Hello")

var submitBtn = document.getElementById("submitBtn");
var movieDiv = document.getElementById("movieDiv");
var searchInput = document.getElementById("searchInput"); 

submitBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission (optional)

    try {
        const apiKey = "26a8b5e8111d2b3fd500afd21defd060";
        const searchTerm = searchInput.value;
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}`; //searchTerm is what is taken in from the user's input

        const response = await fetch(url); // respomse is a string. "{movies: ["tile": "John Wick"]}"
        const container = await response.json();
        const images = container.results;

        images.forEach(movie => {
            const img = document.createElement("img");
            const path = "http://image.tmdb.org/t/p/w154"
            img.src = path + movie.poster_path;
            movieDiv.appendChild(img); // Step 3: Add the image url to the moviesDiv
        });

        console.log(container);
        // console.log(container.results[0].posterpath);
        // Process the data returned from the API
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.log(error);
    }

    // Perform your desired action here
    console.log("Button clicked!");
})
