let movieCount = 3;
let data = [];

async function fetchMovies() {
    try {
        const response = await fetch("https://ghibliapi.vercel.app/films");
        data = await response.json();
        showMovies();
    } catch (error) {
        document.getElementById("movie-listing").innerHTML = "<p>Couldn't fetch movie data </p>" + error;
    }
}

function showMovies() {
    let text = document.getElementById("movie-listing");
    text.innerHTML = "";

    data.slice(0, movieCount).forEach(movie => {
        let card = `
            <div class="mt-3 mb-3 col-lg-4 col-md-4">
                <div class="card h-100 shadow">
                    <img class="card-img-top" src="${movie.image}" alt="${movie.title} movie image">
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title text-center">${movie.title}</h5>
                        <p class="card-text">${movie.description.substring(0, 80)}...</p>
                        <button class="btn btn-primary mt-auto align-self-center modal-trigger" 
                            data-title="${movie.title}" 
                            data-image="${movie.movie_banner}" 
                            data-description="${movie.description}" 
                            data-director="${movie.director}" 
                            data-date="${movie.release_date}" 
                            data-score="${movie.rt_score}">
                            Discover
                        </button>
                    </div>
                </div>
            </div>
        `;
        text.innerHTML += card;
    });

    // Näytä/piilota "Show More" ja "Show Less" -napit
    if (movieCount >= data.length) {
        document.getElementById("moreMovies").classList.add("d-none");
        document.getElementById("lessMovies").classList.remove("d-none");
    }
}

document.getElementById("moreMovies").addEventListener("click", function () {
    movieCount += 3;
    showMovies();
})

// Nämä kaikki toimet tehdään, kun käyttäjä klikkaa buttonia jonka id on "lessMovies"
document.getElementById("lessMovies").addEventListener("click", function () {
    // Asetetaan VAIN 3 elokuvaa näkyviin
    movieCount = 3;
    showMovies();
    this.classList.add("d-none");
    document.getElementById("moreMovies").classList.remove("d-none");
    document.getElementById("movies").scrollIntoView();
});

// Lisää tapahtumankäsittelijä kaikkiin Discover-nappeihin
document.addEventListener("click", function (event) {

    // Jos löydetyn eventin classeissa on modal-trigger
    if (event.target.classList.contains("modal-trigger")) {
        // Laitetaan defult pois ja "pakotetaan" suorittamaan openModal funktio alempana, jolle datat lähetetään
        event.preventDefault();

        let button = event.target;
        openModal(
            button.dataset.title,
            button.dataset.image,
            button.dataset.description,
            button.dataset.director,
            button.dataset.date,
            button.dataset.score
        );
    }
});

function openModal(title, image, description, director, date, score) {
    document.getElementById("exampleModal").innerHTML = `${title} (${date})`;
    document.getElementById("movieImage").src = image;
    document.getElementById("movieDescription").innerHTML = `
    <p class="mt-3 text-center"><strong>Director: ${director}</strong></p>
    <p class="mt-3 text-center">${description}</p>
    <p class="mt-3 text-center">${score} / 100</p>
    `;

    new bootstrap.Modal(document.getElementById("movieModal")).show();
}

// Ladataan elokuvat, kun sivu on valmis
document.addEventListener("DOMContentLoaded", fetchMovies);
