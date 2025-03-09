// TÄMÄ JS FILE ON OMA TEKEMÄ, JOTEN KOMMENTOIN SITÄ

// ALUSSA MÄÄRITELLÄÄN MUUTTUJAT, ELI DATA LISTA (TYHJÄ) JA MOVIECOUNT NUMERO
let movieCount = 3;
let data = [];

// TEHDÄÄN ASYNC FETCH FUNKTIO, JOKA HAKEE ALEMPANA OLEVASTA API URLISTA ELOKUVALISTAN, LAITTAA JSONIKSI JA DATA MUUTTUJAAN TÄMÄN JÄLKEEN KUTSUTAAN SHOWMOVIES FUNKTIOTA
async function fetchMovies() {
    try {
        const response = await fetch("https://ghibliapi.vercel.app/films");
        data = await response.json();
        showMovies();
    // MIKÄLI TULEE VIRHE, NÄYTETÄÄN VIRHEILMOITUS
    } catch (error) {
        document.getElementById("movie-listing").innerHTML = "<p>Couldn't fetch movie data </p>" + error;
    }
}

// TEHDÄÄN SHOWMOVIES FUNKTIO, JOKA NÄYTTÄÄ ELOKUVAT
function showMovies() {
    // ALUSTETAAN TYHJÄ TEXT MUUTTUJA, JOKA ON ELOKUVALISTAN ID HTMLSSÄ
    let text = document.getElementById("movie-listing");
    text.innerHTML = "";

    // KÄYDÄÄN FOREACH LOOPILLA DATA LÄPI JA KÄYTETÄÄN SLICE METODIA, JONKA AVULLA KYKENEMME RAJAAMAAN NÄYTETYN MÄÄRÄN ELOKUVIA MOVIECOUNTIN MUKAAN
    data.slice(0, movieCount).forEach(movie => {
        // JOKAISESTA ELOKUVASTA LUODAAN KORTIT JA DATAT JOTA NÄYTETÄÄN OVAT APIN TIETOJA. KORTIN ALALAIDASSA ON BUTTONI, JOKA LÄHETTÄÄ MÄÄRITETYT DATAT MODAALIIN
        let card = `
            <div class="mt-3 mb-3 col-lg-4 col-md-4">
                <div class="card h-100 shadow">
                    <img class="card-img-top" src="${movie.image}" alt="${movie.title} movie image">
                    <div class="card-body d-flex flex-column text-center">
                        <p class="card-title text-center">${movie.title}</h5>
                        <p class="card-text">${movie.description.substring(0, 80)}...</p>
                        <button class="btn btn-custom mt-auto align-self-center modal-trigger" 
                            data-title="${movie.title}" 
                            data-image="${movie.movie_banner}" 
                            data-description="${movie.description}" 
                            data-director="${movie.director}" 
                            data-date="${movie.release_date}" 
                            data-score="${movie.rt_score}">
                            DISCOVER <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        text.innerHTML += card;
    });

    // MIKÄLI MOVIECOUNT MUUTTUJA ON SUUREMPI TAI YHTÄSUURI KUN DATA LISTAN PITUUS, PIILOTETAAN MOREMOVIES ID OLEVA IKONI JA NÄYTETÄÄN LESSMOVIES ID OLEVA IKONI
    if (movieCount >= data.length) {
        document.getElementById("moreMovies").classList.add("d-none");
        document.getElementById("lessMovies").classList.remove("d-none");
    }
}

// JOS MORE MOVIES IKONIA KLIKATAAN, LISÄTÄÄN MOVIECOUNTIIN 3 JA KUTSUTAAN SHOWMOVIES UUDESTAAN, JOTTA SAADAAN PÄIVITETTY MÄÄRÄ ELOKUVIA NÄKYVIIN
document.getElementById("moreMovies").addEventListener("click", function () {
    movieCount += 3;
    showMovies();
})

// JOS KÄYTTÄJÄ KLIKKAA LESSMOVIES IKONIA, ASETETAAN MOVIECOUNT TAKAISIN 3 ELI PALATAAN ALKUTILANTEESEEN
document.getElementById("lessMovies").addEventListener("click", function () {
    movieCount = 3;
    // KUTSUTAAN SHOWMOVIES FUNKTIOTA UUDELLEEN, JOTTA VOIDAAN NÄYTTÄÄ OIKEA MÄÄRÄ ELOKUVIA
    showMovies();
    // PIILOTETAAN LESSMOVIES IKONI JA NÄYTETÄÄN MOREMOVIES IKONI
    this.classList.add("d-none");
    document.getElementById("moreMovies").classList.remove("d-none");
    // SCROLLATAAN MOVIES ID OLEVAN SECTION ELEMENTIN ALKUUN
    document.getElementById("movies").scrollIntoView();
});

// Lisää tapahtumankäsittelijä kaikkiin Discover-nappeihin
document.addEventListener("click", function (event) {

    // Jos löydetyn eventin classeissa on modal-trigger
    if (event.target.classList.contains("modal-trigger")) {
        // Laitetaan defult pois ja "pakotetaan" suorittamaan openModal funktio alempana, jolle datat lähetetään
        event.preventDefault();

        let button = event.target;

        // KUTSUTAAN OPEN MODAL FUNKTIOTA, JOLLE LÄHETETÄÄN BUTTONIN DATAT
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

// OPENMODAL FUNKTIOSSA NÄYTETÄÄN PUOLESTAAN AIEMMIN LÄHETETYT DATAT HTML KOODISSA MÄÄRITELLYSSÄ ESIMERKKIMODAALISSA
function openModal(title, image, description, director, date, score) {
    // NÄYTETÄÄN ELOKUVAN TITLE, VUOSI, KUVA, KUVAUS, OHJAAJA JA ARVOSTELU
    document.getElementById("exampleModal").innerHTML = `${title} (${date})`;
    document.getElementById("movieImage").src = image;
    document.getElementById("movieDescription").innerHTML = `
    <p class="mt-3 text-center"><strong>Director: ${director}</strong></p>
    <p class="mt-3 text-center">${description}</p>
    <p class="mt-3 text-center">${score} / 100</p>
    `;

    // LUODAAN JA NÄYTETÄÄN MODAALI JOKA LÖYTYY HTML KOODISTA ID:LLÄ MOVIEMODAL
    new bootstrap.Modal(document.getElementById("movieModal")).show();
}

// Ladataan elokuvat, kun sivu on valmis
document.addEventListener("DOMContentLoaded", fetchMovies);

// FUNKTIO, JOSSA VALIDOIDAAN FORM INPUTIT
function validateFields() {
    let form = document.getElementById("contactForm");

    // JOS KAIKKI FORMIN KENTÄT EIVÄT OLE VALID
    if (!form.checkValidity()) {
        // LISÄTÄÄN BOOTSTRAP VALIDAATIOLUOKKA, JOKA NÄYTTÄÄ x TAI check IKONIT KENTÄN OIKEASSA LAIDASSA
        form.classList.add("was-validated");
        return;
    }

    // KUTSUTAAN MOCKSEND FUNKTIOTA, MIKÄLI INPUTIT OVAT VALIDEJA
    mocksend();
}

// MOCKSEND FUNKTIO, JOLLA NÄYTETÄÄN ALERT ONNISTUNEESTA LÄHETYKSESTÄ
function mocksend() {

    // ETSITÄÄN ALERT ELEMENTTI SEN ID AVULLA
    let success = document.getElementById("success-alert");

    // POISTETAAN DISPLAY NONE LUOKKA
    success.classList.remove("d-none");

    // TYHJENNETÄÄN FORM INPUTIT
    document.getElementById("contactForm").reset();

    // POISTETAAN MAHDOLLISET BOOTSTRAP VALIDAATIOT
    document.getElementById("contactForm").classList.remove("was-validated");

    // SETTIMEOUT METODILLA PIILOTETAAN NÄKYVISSÄ OLEVA ALERT LISÄÄMÄLLÄ DISPLAY NONE 3 SEKUNNIN JÄLKEEN
    setTimeout(function () {
        success.classList.add("d-none");
    }, 3000);
}

// LUODAAN FUNKTIO, JONKA AVULLA SAADAAN NÄYTETTYÄ BOOTSTRAP TOOLTIPIT, KUN SIVU ON LADATTU
document.addEventListener("DOMContentLoaded", function () {
    // ETSITÄÄN KAIKKI TOOLTIPIT
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // JOKAISESTA TOOLTIPISTÄ TEHDÄÄ BOOTSTRAP TOOLTIP, JOTTA NE TOIMIVAT
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
});
