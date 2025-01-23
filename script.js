document.getElementById("searchForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
        fetchMovies(query);
    }
});

const apiKey = "b02f842e"

async function fetchMovies(query) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            document.getElementById("movieList").innerHTML = `<p>${data.Error}</p>`;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

function displayMovies(movies) {
    const MovieList = document.getElementById("movieList");
    MovieList.innerHTML = "";

    movies.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.className = "movie-item";
        movieItem.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster: "placehomder.jpg"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>Release Year: ${movie.Year}</p>
        <button onclick="showMovieDetails('${movie.imdbID}')">Read More</button>
        `;
        movieList.appendChild(movieItem);
    });
}

async function showMovieDetails(imdbID) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
    try {
        const response = await fetch(url);
        const movie = await response.json();
        if (movie.Response === "True") {
            alert(`
                Title: ${movie.Title}
                Plot: ${movie.Plot}
                Released: ${movie.Released}
                Genre: ${movie.Genre}
                `);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du film :", error);
    }
}
