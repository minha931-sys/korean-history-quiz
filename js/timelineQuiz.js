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

const MIN_TIMELINE_QUIZ_YEAR = 500;

function getTimelineQuizYearValue(year){

    const text =
        String(year);

    const numberMatch =
        text.match(/\d+/);

    if(!numberMatch){
        return Number.POSITIVE_INFINITY;
    }

    const value =
        Number(numberMatch[0]);

    if(text.includes("기원전")){
        return -value;
    }

    if(text.includes("세기")){
        return (value - 1) * 100 + 50;
    }

    return value;

}

function isTimelineQuizEligible(event){

    return getTimelineQuizYearValue(event.year) >=
        MIN_TIMELINE_QUIZ_YEAR;

}

const quizEvents =
    allEvents.filter(
        isTimelineQuizEligible
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

    if(quizEvents.length === 0){

        quizArea.innerHTML = `

            <p>
                현재 출제 가능한 연표 문제가 없습니다.
            </p>

        `;

        return;

    }

    const answer =
        quizEvents[
            Math.floor(
                Math.random() *
                quizEvents.length
            )
        ];

    const sameEraEvents =
        TIMELINE[
            answer.category
        ]
        .filter(
            item =>
                item.event !==
                answer.event &&
                isTimelineQuizEligible(item)
        );

    const wrongPool =
        sameEraEvents.length >= 3
            ? sameEraEvents
            : quizEvents.filter(
                item =>
                    item.event !==
                    answer.event
            );

    const wrongs =
        wrongPool
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
