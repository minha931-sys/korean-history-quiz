const quizArea =
    document.getElementById(
        "quiz-area"
    );

const allEvents =
    Object.entries(
        TIMELINE
    ).flatMap(
        ([category, events]) =>
            events.map(
                event => ({
                    ...event,
                    category
                })
            )
    );

let currentQuestion;
let currentChoices = [];
let nextQuestionTimeoutId = null;

function formatTimelineYear(year){

    return /^\d+$/.test(year)
        ? `${year}년`
        : year;

}

function getRandomQuestion(){

    const answer =
        allEvents[
            Math.floor(
                Math.random() *
                allEvents.length
            )
        ];

    const sameEraEvents =
        TIMELINE[
            answer.category
        ]
        .filter(
            item =>
                item.event !==
                answer.event
        );

    const wrongs =
        sameEraEvents
        .sort(
            () =>
            Math.random() - 0.5
        )
        .slice(0,3);

    const choices =
        [
            answer,
            ...wrongs
        ]
        .sort(
            () =>
            Math.random() - 0.5
        );

    currentQuestion =
        answer;
    currentChoices =
        choices;

    quizArea.innerHTML = `

        <h2>

            ${formatTimelineYear(answer.year)}

        </h2>

        <p>

            어떤 사건일까요?

        </p>

        <div class="choices">

            ${choices.map(
                (c, index) => `
                <button
                    class="choice-btn"
                    onclick="checkAnswer(${index})">

                    ${c.event}

                </button>
                `
            ).join("")}

        </div>

        <p
            class="timeline-auto-next-message"
            id="timeline-auto-next-message">

            3초 뒤 다음 문제로 자동으로 넘어가집니다.

        </p>

    `;
}

function checkAnswer(choiceIndex){

    if(nextQuestionTimeoutId){

        return;

    }

    const choiceButtons =
        document.querySelectorAll(
            ".choice-btn"
        );

    const selectedChoice =
        currentChoices[
            choiceIndex
        ];

    const correctIndex =
        currentChoices.findIndex(
            item =>
                item.event ===
                currentQuestion.event
        );

    choiceButtons.forEach(btn => {

        btn.disabled = true;

    });

    choiceButtons[
        correctIndex
    ].classList.add(
        "correct"
    );

    choiceButtons[
        correctIndex
    ].innerHTML = `
        <span>${currentQuestion.event}</span>
        <span class="answer-badge">정답</span>
    `;

    const autoNextMessage =
        document.getElementById(
            "timeline-auto-next-message"
        );

    if(autoNextMessage){

        autoNextMessage.classList.add(
            "show"
        );

    }

    if(
        selectedChoice.event ===
        currentQuestion.event
    ){

        choiceButtons[
            choiceIndex
        ].classList.add(
            "selected"
        );

    }
    else{

        choiceButtons[
            choiceIndex
        ].classList.add(
            "wrong"
        );

    }

    nextQuestionTimeoutId =
        window.setTimeout(
            () => {

                nextQuestionTimeoutId =
                    null;

                getRandomQuestion();

            },
            3000
        );

}

getRandomQuestion();
