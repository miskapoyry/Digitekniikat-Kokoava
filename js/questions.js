// TÄSSÄ ON QUESTIONS OBJEKTI, JONNE ON TALLETTU KYSYMYKSET, VASTAUKSET JA NIIDEN PISTEET

const questions = [
    {
        question: "How would you describe your personality?",
        answers: [
            {text: "Calm and collected", points: 1},
            {text: "Balanced and adaptable", points: 2},
            {text: "Energetic and outgoing", points: 3},
        ]
    },
    {
        question: "Where do you feel most at peace?",
        answers: [
            {text: "In the mountains", points: 1},
            {text: "By the sea", points: 2},
            {text: "In the city", points: 3},
        ]
    },
    {
        question: "What is your favorite season?",
        answers: [
            {text: "Spring", points: 1},
            {text: "Summer", points: 2},
            {text: "Winter", points: 3},
        ]
    },
    {
        question: "What do you like to do in your free time?",
        answers: [
            {text: "Read a book", points: 1},
            {text: "Go for a run", points: 2},
            {text: "Meet friends", points: 3},
        ]
    },
    {
        question:"What kind of friend you are?",
        answers: [
            {text: "Inspiring and brave", points: 3},
            {text: "Trustworthy and loyal", points: 1},
            {text: "Fun and inventive", points: 2},
        ]
    }
];

//LUODAAN RESULYS OBJEKTI, JOKA SISÄLTÄÄ TULOKSET (ELI HAHMOJEN NIMET), LYHYET KUVAUKSET, MINIMI JA MAKSIMI PISTEMÄÄRÄT JA KUVIEN OSOITTEET, JOITA NÄYTETÄÄN SIVULLA
const results = [
    { result: "Totoro", text: "You are gentle, kind, and in tune with nature!", min: 5, max: 8, picture: "https://images.pexels.com/photos/302100/pexels-photo-302100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    { result: "Chihiro", text: "You are brave and always up for an adventure!", min: 9, max: 12, picture: "https://images.pexels.com/photos/1659437/pexels-photo-1659437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    { result: "Howl", text: "You are full of energy and carry around a sense of mystery!", min: 13, max: 15, picture: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
];

// ALUSTETAAN INDEKSI JA PISTE MUUTTUJAT
let index = 0;
let points = 0;

function getQuestion() {

    // JOS INDEKSI ON SUUREMPI TAI YHTÄ SUURI KUN KYSYMYSTEN LENGTH, KUTSUTAAN showResults FUNKTIO
    if(index >= questions.length) {
        return showResults();
    }

    // ASETETAAN CURRENT KYSYMYS KYSYMYS ARRAYSTA INDEKSIN AVULLA
    const currentQuestion = questions[index];
    // ASETETAAN HTML KOODISSA OLEVAAN QUESTION ID VARUSTETTUUN ELEMENTTIIN KYSEISEN KYSYMYKSEN KYSYMYSOSA
    document.getElementById("question").innerHTML = currentQuestion.question;

    // HAETAAN MUUTTUJAAN OPTIONS ID OLEVA ELEMENTTI HTML KOODISTA JA TYHJENNETÄÄN SE
    const answerOptions = document.getElementById("options");
    answerOptions.innerHTML = "";

    // KÄYDÄÄN LÄPI JOKAINEN KYSYMYKSEN VAIHTOEHTO
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-button");
        button.onclick = () => {
            points += answer.points;
            index++;
            getQuestion();
        }
        answerOptions.appendChild(button);
    });
}

// FUNKTIO, JONKA AVULLA NÄYTETÄÄN TIETOVISAN TULOKSET
function showResults() {

    // LUODAAN RESULT MUUTTUJA, JOHON ETSITÄÄN AIEMMIN LUODUISTA RESULTEISTA SE, JONNE POINTS KULLAKIN HETKELLÄ SIJOITTUU
    let result = results.find(result => points >= result.min && points <= result.max);

    // TÄYTETÄÄN HTML ELEMENTIT AIEMMIN TÄYTETYLLÄ RESULT MUUTTUJAN SISÄLTÄMILLÄ TIEDOILLA
    document.getElementById("question").textContent = `You are ${result.result}!`;
    document.getElementById("options").innerHTML = `
    <img src="${result.picture}" class="btn img-fluid mx-auto d-block rounded mb-3" style="max-width: 300px;" alt="${result.result}">
    <p class="text-center">${result.text}</p>`;
    
    // NÄYTETÄÄN RESTART NAPPI, JA LAITETAAN SILLE CSS LUOKKA ANSWE-BUTTON
    document.getElementById("restart").classList.add("answer-button");
    document.getElementById("restart").style.display = "block";
}

// TÄMÄN FUNKTION AVULLA NOLLATAAN MUUTTUJAT, PIILOTETAAN RESTART NAPPI JA KTUSUTAAN GETQUESTIONS FUNKTIOTA UUDELLEEN, JOLLOIN KÄYNNISTETÄÄN TIETOVISA UUDELLEEN
function restartCharacterQuiz() {
    index = 0;
    points = 0;
    document.getElementById("restart").style.display = "none";
    getQuestion();
}

getQuestion();