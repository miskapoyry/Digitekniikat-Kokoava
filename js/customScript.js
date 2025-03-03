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
                        <a href="#" class="btn btn-primary mt-auto align-self-center">More info</a>
                    </div>
                </div>
            </div>
        `
        text.innerHTML += card;
    });

    // MIKÄLI MOVIE COUNT ON YLI MOVIE LISTAN PITUUDEN, LAITETAAN MOREMOVIES NAPIN DISPLAY TILAAN NONE, JOLLOIN SITÄ EI NÄYTETÄ

    if(movieCount >= data.length){
        document.getElementById("moreMovies").style.display = "none";
    }
}

document.getElementById("moreMovies").addEventListener("click", function(){
    movieCount += 3;
    showMovies();
})

document.addEventListener("DOMContentLoaded", fetchMovies);