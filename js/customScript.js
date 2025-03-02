async function fetchMovies() {
    try{
        const response = await fetch("https://ghibliapi.vercel.app/films");
        const data = await response.json();
        showMovies(data);
    } catch(error) {
        document.getElementById("movie-listing").innerHTML = "<p>Couldn't fetch movie data </p>" + error;
    }
}

function showMovies(data){
    let text = document.getElementById("movie-listing");
    text.innerHTML = "";

    console.log(data)

    data.forEach(movie => {
        let card = `
            <div class="mt-3 mb-3 col-lg-4 col-md-4">
                <div class="card h-100 shadow">
                    <img class="card-img-top" src="${movie.image}" alt="Card image cap">
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title text-center">${movie.title}</h5>
                        <p class="card-text">${movie.description.substring(0,80)}...</p>
                        <a href="#" class="btn btn-primary mt-auto align-self-center">Go somewhere</a>
                    </div>
                </div>
            </div>
        `
        text.innerHTML += card;
    });
}

document.addEventListener("DOMContentLoaded", fetchMovies);