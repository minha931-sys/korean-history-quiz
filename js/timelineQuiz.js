const quizArea = document.getElementById("quiz-area");
const TIMELINE_QUIZ_LENGTH = 10;
const seenTimelineEventKeys = new Set();

const allEvents = Object.entries(TIMELINE).flatMap(
    ([category, events]) => events.map(event => ({
        ...event,
        category
    }))
).filter(event => {
    const eventKey =
        `${event.year}|${event.event}`;

    if(seenTimelineEventKeys.has(eventKey)){
        return false;
    }

    seenTimelineEventKeys.add(eventKey);
    return true;
});

let quizQuestions = [];
let currentQuestionIndex = 0;
let currentChoices = [];
let score = 0;
let isAnswered = false;

function getTimelineQuizYearValue(year){
    const text = String(year);
    const numberMatch = text.match(/\d+/);

    if(!numberMatch){
        return Number.POSITIVE_INFINITY;
    }

    const value = Number(numberMatch[0]);

    if(text.includes("기원전")){
        return -value;
    }

    if(text.includes("세기")){
        return (value - 1) * 100 + 50;
    }

    return value;
}

function isTimelineQuizEligible(event){
    return Number.isFinite(
        getTimelineQuizYearValue(event.year)
    );
}

function shuffle(items){
    const result = [...items];

    for(let i = result.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function formatTimelineYear(year){
    return /^\d+$/.test(year) ? `${year}년` : year;
}

function isSameEvent(first, second){
    return first.event === second.event &&
        first.year === second.year &&
        first.category === second.category;
}

function buildChoices(answer){
    const sameEraEvents = allEvents.filter(item =>
        item.category === answer.category &&
        !isSameEvent(item, answer) &&
        isTimelineQuizEligible(item)
    );

    const fallbackEvents = allEvents.filter(item =>
        !isSameEvent(item, answer) &&
        isTimelineQuizEligible(item)
    );

    const wrongPool = sameEraEvents.length >= 3
        ? sameEraEvents
        : fallbackEvents;

    return shuffle([
        answer,
        ...shuffle(wrongPool).slice(0, 3)
    ]);
}

function startTimelineQuiz(){
    const eligibleEvents = allEvents.filter(isTimelineQuizEligible);

    quizQuestions = shuffle(eligibleEvents).slice(0, TIMELINE_QUIZ_LENGTH);
    currentQuestionIndex = 0;
    score = 0;
    isAnswered = false;

    if(quizQuestions.length === 0){
        quizArea.innerHTML = "<p>현재 출제 가능한 연표 문제가 없습니다.</p>";
        return;
    }

    renderQuestion();
}

function renderQuestion(){
    const answer = quizQuestions[currentQuestionIndex];
    const total = quizQuestions.length;
    const progress = Math.round(((currentQuestionIndex + 1) / total) * 100);

    currentChoices = buildChoices(answer);
    isAnswered = false;

    quizArea.innerHTML = `
        <div class="timeline-quiz-status" aria-label="퀴즈 진행 상황">
            <span>문제 ${currentQuestionIndex + 1} / ${total}</span>
            <span>현재 ${score}점</span>
        </div>
        <div class="progress-bar" aria-hidden="true">
            <div class="progress-fill" style="width:${progress}%"></div>
        </div>
        <p class="timeline-quiz-era">${answer.category}</p>
        <h2>${formatTimelineYear(answer.year)}</h2>
        <p class="timeline-quiz-question">이 연도에 해당하는 사건은 무엇일까요?</p>
        <div class="choices" role="group" aria-label="정답 선택">
            ${currentChoices.map((choice, index) => `
                <button type="button"
                        class="choice-btn"
                        data-choice-index="${index}">
                    ${choice.event}
                </button>
            `).join("")}
        </div>
        <div id="timeline-answer-feedback"
             class="timeline-answer-feedback"
             aria-live="polite"></div>
    `;

    quizArea.querySelectorAll("[data-choice-index]").forEach(button => {
        button.addEventListener("click", () => {
            checkAnswer(Number(button.dataset.choiceIndex));
        });
    });
}

function checkAnswer(choiceIndex){
    if(isAnswered){
        return;
    }

    isAnswered = true;

    const answer = quizQuestions[currentQuestionIndex];
    const selectedChoice = currentChoices[choiceIndex];
    const isCorrect = isSameEvent(selectedChoice, answer);
    const choiceButtons = quizArea.querySelectorAll(".choice-btn");
    const correctIndex = currentChoices.findIndex(choice => isSameEvent(choice, answer));

    if(isCorrect){
        score += 1;
    }

    choiceButtons.forEach((button, index) => {
        button.disabled = true;
        button.setAttribute("aria-pressed", String(index === choiceIndex));

        if(index === correctIndex){
            button.classList.add("correct");
            const badge = document.createElement("span");
            badge.className = "answer-badge";
            badge.textContent = "정답";
            button.append(badge);
        }
    });

    if(!isCorrect){
        choiceButtons[choiceIndex].classList.add("wrong");
    }

    const feedback = document.getElementById("timeline-answer-feedback");
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

    feedback.innerHTML = `
        <p class="timeline-feedback-result ${isCorrect ? "is-correct" : "is-wrong"}">
            ${isCorrect ? "정답입니다." : "정답을 확인해보세요."}
        </p>
        <p><strong>${formatTimelineYear(answer.year)} · ${answer.event}</strong></p>
        <p>${answer.description}</p>
        <button type="button" class="primary-btn" id="timeline-next-question">
            ${isLastQuestion ? "결과 보기" : "다음 문제"}
        </button>
    `;

    feedback.setAttribute("tabindex", "-1");
    feedback.focus();

    document.getElementById("timeline-next-question").addEventListener("click", () => {
        if(isLastQuestion){
            showTimelineQuizResult();
            return;
        }

        currentQuestionIndex += 1;
        renderQuestion();
    });
}

function showTimelineQuizResult(){
    const total = quizQuestions.length;
    const accuracy = Math.round((score / total) * 100);

    if(typeof window.gtag === "function"){
        window.gtag("event", "timeline_quiz_complete", {
            question_count: total,
            score,
            accuracy
        });
    }

    quizArea.innerHTML = `
        <div class="timeline-quiz-result" tabindex="-1">
            <p class="timeline-quiz-era">10문제 학습 완료</p>
            <h2>${score} / ${total}</h2>
            <p>정답률 ${accuracy}%입니다. 틀린 사건은 핵심 연표에서 앞뒤 흐름까지 함께 확인해보세요.</p>
            <div class="result-actions">
                <button type="button" class="secondary-btn" id="timeline-quiz-restart">다시 풀기</button>
                <a class="primary-btn" href="timeline.html">핵심 연표로 복습하기</a>
            </div>
        </div>
    `;

    const result = quizArea.querySelector(".timeline-quiz-result");
    result.focus();

    document.getElementById("timeline-quiz-restart").addEventListener(
        "click",
        startTimelineQuiz
    );
}

startTimelineQuiz();
