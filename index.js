document.addEventListener("DOMContentLoaded", function () {
    const yearEL = document.getElementById("year");
    if (yearEL) {
        yearEL.textContent = new Date.getFullYear();
    };
})

const app = document.getElementById("quizApp");
if (!app) {
    return;
}

let questions = [];
let currentIndex = 0;
let score = 0;

// Hent spørsmål
fetch("data/questions.json")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        questions = data;
        showQuestion();
    })
    .catch(function () {
        app.innerHTML = "<p>Kunne ikke laste quizen. Sjekk om data/questions.json filen finnes.</p>"
    });   


function showQuestion() {
    if (!questions || questions.length === 0) {
        app.innerHTML = "<p>Ingen spørsmål funnet</p>"
        return;
    }
    const q = questions[currentIndex];

    // Tøm Skjermen
    app.innerHTML = "";

    //Spørsmåls tittel
    const title = document.createElement("h3")
    title.textContent = (currentIndex + 1) + ". " + q.question;
    app.appendChild(title);

    //Bilde (hvis det er et bilde (Vittorio, 2025))
    if (q.image) {
        const figure = document.createElement("img");
        img.src = q.image;
        img.alt = q-imageAlt || "Scenario bilde";
        figure.appendChild(img);

        const caption = document.createElement("figcaption");
        caption.textContent = q.type ? ("Scenario: " + q.type) : "Scenario";
        figure.appendChild(caption);

        app.appendChild(figure)
    }

}
