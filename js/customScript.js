let movieCount = 3;
let data = []

async function fetchMovies() {
    try{
        const response = await fetch("https://ghibliapi.vercel.app/films");
        data = await response.json();
        showMovies();
    } catch(error) {
        document.getElementById("movie-listing").innerHTML = "<p>Couldn't fetch movie data </p>" + error;
    }
}

function showMovies(){
    let text = document.getElementById("movie-listing");
    text.innerHTML = "";

    console.log(data)

    data.slice(0,movieCount).forEach(movie => {
        let card = `
            <div class="mt-3 mb-3 col-lg-4 col-md-4">
                <div class="card h-100 shadow">
                    <img class="card-img-top" src="${movie.image}" alt="Card image cap">
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title text-center">${movie.title}</h5>
                        <p class="card-text">${movie.description.substring(0,80)}...</p>
                        <a href="#" class="btn btn-primary mt-auto align-self-center"> Discover </a>
                    </div>
                </div>
            </div>
        `
        text.innerHTML += card;
    });

    // MIKÄLI MOVIE COUNT ON YLI MOVIE LISTAN PITUUDEN, LAITETAAN MOREMOVIES NAPIN DISPLAY TILAAN NONE, JOLLOIN SITÄ EI NÄYTETÄ

    if(movieCount >= data.length){
        document.getElementById("moreMovies").classList.add("d-none");
        document.getElementById("lessMovies").classList.remove("d-none");
    }
}

document.getElementById("moreMovies").addEventListener("click", function(){
    movieCount += 3;
    showMovies();
})

// Nämä kaikki toimet tehdään, kun käyttäjä klikkaa buttonia jonka id on "lessMovies"
document.getElementById("lessMovies").addEventListener("click", function(){
    // Asetetaan VAIN 3 elokuvaa näkyviin
    movieCount = 3;
    
    // Kutsutaan showMovies() -funktiota
    showMovies();

    // Laitetaan Show less -button display none tilaan
    this.classList.add("d-none");

    // Laitetaan Show More -buttonista display none pois
    document.getElementById("moreMovies").classList.remove("d-none");

    // Klikkauksen jälkeen scrollataan movies kohdan alkuun, jotta voidaan näyttää vain kolme elokuvaa
    document.getElementById("movies").scrollIntoView();
})

document.addEventListener("DOMContentLoaded", fetchMovies);