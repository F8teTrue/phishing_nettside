document.addEventListener("DOMContentLoaded", function () {
    const yearEL = document.getElementById("year");
    if (yearEL) {
        yearEL.textContent = new Date().getFullYear();
    };

    const app = document.getElementById("quizApp");
    if (!app) {
        return;
    }

    function scrollToQuizTop() {
        const y = app.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth"});
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
        title.id = "quizQuestionTitle";
        title.textContent = (currentIndex + 1) + ". " + q.question;
        app.appendChild(title);

        //Bilde (hvis det er et bilde (Vittorio, 2025))
        if (q.image) {
            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.src = q.image;
            img.alt = q.imageAlt || "Scenario bilde";
            figure.appendChild(img);

            const caption = document.createElement("figcaption");
            caption.textContent = q.type ? ("Scenario: " + q.type) : "Scenario";
            figure.appendChild(caption);

            app.appendChild(figure)
        }

        // Alternativer
        const optionsWrap = document.createElement("div");
        optionsWrap.className = "quiz-options";
        app.appendChild(optionsWrap);

        q.options.forEach(function (text, idx) {
            const btn = document.createElement("button");
            btn.className = "quiz-button";
            btn.textContent = text;
            btn.addEventListener("click", function () {
                handleAnswer(idx, btn, optionsWrap);
            });
            optionsWrap.appendChild(btn)
        });
        
        // Tilbakemelding på valgt svar
        const feedback = document.createElement("p");
        feedback.id = "quizFeedback";
        feedback.className = "quiz-feedback";
        app.appendChild(feedback);

        const next = document.createElement("button");
        next.textContent = "Neste";
        next.className = "quiz-next";
        next.disabled = true;
        next.addEventListener("click", function () {
            goNext();
        });
        app.appendChild(next);
        
        // Håndterer valgt svar og score
        function handleAnswer(chosenIndex, clickedBtn, optionsWrapEl) {
            const correct = q.correctIndex;

            const all = optionsWrapEl.querySelectorAll("button");
            all.forEach(function (b) {
                b.disabled = true;
            });

            if (chosenIndex === correct) {
                score = score + 1;
                clickedBtn.classList.add("is-correct");
                feedback.textContent = "Riktig! " + q.explanation;
            } else {
                clickedBtn.classList.add("is-wrong");
                all[correct].classList.add("is-correct");
                feedback.textContent = "Feil. " + q.explanation;
            }

            next.disabled = false;
            next.focus();
        };
        
        // Håndterer "neste spørsmål" funksjonalitet, og eventuelt kaller resultatsvisning.
        function goNext() {
            currentIndex = currentIndex + 1;
            if (currentIndex < questions.length) {
                showQuestion();
                requestAnimationFrame(() => {
                    const t = document.getElementById("quizQuestionTitle");
                    if (t) {
                        const y = t.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: y, behavior: "smooth" });
                    } else {
                        scrollToQuizTop();
                    }
                });
            } else {
                showResult();
                requestAnimationFrame(scrollToQuizTop);
            }
        };
    };

    // Viser resultatet av quizen og lar bruker starte på nytt.
    function showResult() {
        app.innerHTML = ""

        const h = document.createElement("h3")
        h.textContent = "Ferdig!";
        app.appendChild(h);

        const p = document.createElement("p");
        p.textContent = "Du fikk " + score + " av " + questions.length + " riktige.";
        app.appendChild(p);

        const again = document.createElement("button");
        again.textContent = "Start på nytt";
        again.className = "quiz-button";
        again.addEventListener("click", function () {
            currentIndex = 0;
            score = 0;
            showQuestion();
            requestAnimationFrame(scrollToQuizTop);
        });
        app.appendChild(again);
    }
}); 