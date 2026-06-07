const studyWrongBtn =
    document.getElementById(
        "study-wrong-btn"
    );

const homeBtn =
    document.getElementById(
        "home-btn"
    );

const homeScreen =
    document.getElementById("home-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");

const startBtn =
    document.getElementById("start-btn");

const restartBtn =
    document.getElementById("restart-btn");

const shareBtn =
    document.getElementById("share-btn");

const questionText =
    document.getElementById("question-text");

const choiceButtons =
    document.querySelectorAll(".choice-btn");

const explanationBox =
    document.getElementById("explanation-box");

const questionNumber =
    document.getElementById("question-number");

const progressText =
    document.getElementById("progress-text");

const progressFill =
    document.querySelector(".progress-fill");

const scoreDisplay =
    document.getElementById("score-display");

const gradeCard =
    document.getElementById("grade-card");

const retryWrongBtn =
    document.getElementById(
        "retry-wrong-btn"
    );

const nextBtn =
    document.getElementById(
        "next-btn"
    );

const categorySelect =
    document.getElementById(
        "category-select"
    );

const wrongNoteBtn =
    document.getElementById(
        "wrong-note-btn"
    );

const wrongNoteScreen =
    document.getElementById(
        "wrong-note-screen"
    );

const wrongNoteList =
    document.getElementById(
        "wrong-note-list"
    );

const clearNoteBtn =
    document.getElementById(
        "clear-note-btn"
    );

const backHomeBtn =
    document.getElementById(
        "back-home-btn"
    );

let selectedQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let wrongQuestionsThisRound = [];

let isRetryMode = false;

function shuffle(array){

    return [...array].sort(
        () => Math.random() - 0.5
    );

}

function buildQuizSet(){

    const selectedCategory =
        categorySelect.value;

    let sourceQuestions =
        QUESTIONS;

    if(
        selectedCategory !== "all"
    ){

        sourceQuestions =
            QUESTIONS.filter(
                q =>
                q.category ===
                selectedCategory
            );

    }

    const mediumQuestions =
        sourceQuestions.filter(
            q =>
            q.difficulty === "medium"
        );

    const hardQuestions =
        sourceQuestions.filter(
            q =>
            q.difficulty === "hard"
        );

    const selectedMedium =
        shuffle(mediumQuestions)
        .slice(
            0,
            Math.min(
                5,
                mediumQuestions.length
            )
        );

    const selectedHard =
        shuffle(hardQuestions)
        .slice(
            0,
            Math.min(
                5,
                hardQuestions.length
            )
        );

    return shuffle([
        ...selectedMedium,
        ...selectedHard
    ]);

}

function startQuiz(){

    selectedQuestions =
        buildQuizSet();

    currentQuestionIndex = 0;

    score = 0;

    wrongQuestionsThisRound = [];

    isRetryMode = false;

    homeScreen.classList.remove(
        "active"
    );

    resultScreen.classList.remove(
        "active"
    );

    quizScreen.classList.add(
        "active"
    );

    showQuestion();
    updateHomeButton();

}

function showQuestion(){
    const oldInlineExplanation =
        document.querySelector(
            ".inline-explanation"
        );

    if(oldInlineExplanation){

        oldInlineExplanation.remove();

    }

    const question =
        selectedQuestions[
            currentQuestionIndex
        ];

    questionText.textContent =
        question.question;

    questionNumber.textContent =
        `문제 ${
        currentQuestionIndex + 1
        } / ${
        selectedQuestions.length
        }`;

    progressText.textContent =
        `${(currentQuestionIndex + 1) * 10}%`;

    progressFill.style.width =
        `${(currentQuestionIndex + 1) * 10}%`;

    explanationBox.innerHTML = "";

    explanationBox.style.display =
        "none";

    nextBtn.style.display =
        "none";

    choiceButtons.forEach(
        (button,index)=>{

        button.disabled = false;

        button.classList.remove(
            "correct",
            "wrong",
            "selected"
        );

        button.textContent =
            question.choices[index];

    });

}

function selectAnswer(index){

    const question =
        selectedQuestions[
            currentQuestionIndex
        ];

    const correctIndex =
        question.answer;

    choiceButtons.forEach(btn=>{

        btn.disabled = true;

    });

    choiceButtons[index]
        .classList.add(
            "selected"
        );

    if(index === correctIndex){

        score++;
        if(isRetryMode){

            increaseReviewCount(
                question.id
            );

        }

        choiceButtons[index]
            .classList.add(
                "correct"
            );

    }else{

        saveWrongQuestion(
            question
        );

        if(
            !wrongQuestionsThisRound.some(
            q => q.id === question.id
            )
        ){

            wrongQuestionsThisRound.push(
                question
        );

        }

        choiceButtons[index]
            .classList.add(
                "wrong"
            );

        choiceButtons[correctIndex]
            .classList.add(
                "correct"
            );

    }

    const oldInlineExplanation =
        document.querySelector(
            ".inline-explanation"
    );

    if(oldInlineExplanation){

        oldInlineExplanation.remove();

    }

    const explanationDiv =
        document.createElement("div");

    explanationDiv.className =
        "inline-explanation";

    explanationDiv.innerHTML =
        `📖 ${question.explanation}`;

    choiceButtons[correctIndex]
        .insertAdjacentElement(
            "afterend",
            explanationDiv
        );

    if(
        currentQuestionIndex ===
        selectedQuestions.length - 1
    ){

    nextBtn.textContent =
        "결과 보기";

    }else{

    nextBtn.textContent =
        "다음 문제";

    }

    nextBtn.style.display =
        "block";

}

function getGrade(score){

    if(score >= 9){

        return "👑 한국사 마스터";

    }

    if(score >= 7){

        return "🏆 한국사 고수";

    }

    if(score >= 5){

        return "🥈 한국사 중수";

    }

    if(score >= 3){

        return "🥉 한국사 초보";

    }

    return "📖 역사 입문자";

}

function showResult(){
    if(isRetryMode){

        gradeCard.innerHTML =

            `
            🎉 복습 완료
            <br><br>
            오답 문제 복습이 끝났습니다.
            `;

    }

    quizScreen.classList.remove(
        "active"
    );

    resultScreen.classList.add(
        "active"
    );

    scoreDisplay.innerHTML =
    `${score} / ${selectedQuestions.length}`;

    gradeCard.innerHTML =

        `
        ${getGrade(score)}
        <br><br>
        정답률 ${score * 10}%
        `;

    saveStats(score);
    updateHomeButton();

    if(isRetryMode){

        shareBtn.style.display =
            "none";

    }else{

        shareBtn.style.display =
            "block";

    }
    if(isRetryMode){

        retryWrongBtn.style.display =
            "block";

        retryWrongBtn.textContent =
            "📖 오답노트 보기";

    }else{

        if(
            wrongQuestionsThisRound.length > 0
        ){

            retryWrongBtn.style.display =
                "block";

            retryWrongBtn.textContent =
                "틀린 문제 다시 풀기";

        }else{

            retryWrongBtn.style.display =
                "none";

    }

}

}

function shareResult(){

    const text =

`📜 한국사 10분 챌린지

점수 : ${score}/10

${getGrade(score)}

도전해보세요!`;

    navigator.clipboard
        .writeText(text);

    alert(
        "결과가 복사되었습니다."
    );

}

startBtn.addEventListener(
    "click",
    startQuiz
);

restartBtn.addEventListener(
    "click",
    startQuiz
);

shareBtn.addEventListener(
    "click",
    shareResult
);

choiceButtons.forEach(
    (button,index)=>{

    button.addEventListener(
        "click",
        ()=>selectAnswer(index)
    );

});

loadStats();
updateHomeButton();
function showWrongNote(){

    homeScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.remove("active");

    wrongNoteScreen.classList.add("active");

    const wrongQuestions =
        getWrongQuestions();

    if(wrongQuestions.length === 0){

        wrongNoteList.innerHTML =
        `
        <p>
            저장된 오답이 없습니다.
        </p>
        `;
        
        return;

    }
    updateHomeButton();

    wrongNoteList.innerHTML =

    wrongQuestions
    .sort(
        (a,b)=>
        a.reviewCount -
        b.reviewCount
    )
    .map(item =>

    `
    <div class="wrong-question-card">
        <button
            class="delete-wrong-btn"
            data-id="${item.question.id}"
        >
            ✕
        </button>

        <h3>
            ${item.question.question}
        </h3>

        <p>
            정답 :
            ${item.question.choices[
                item.question.answer
            ]}
        </p>

        <p>
            해설 :
            ${item.question.explanation}
        </p>

    </div>
    `

    ).join("");
    document
    .querySelectorAll(
        ".delete-wrong-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const questionId =
                    Number(
                        button.dataset.id
                    );

                if(
                    confirm(
                        "이 문제를 오답노트에서 삭제할까요?"
                    )
                ){

                    removeWrongQuestion(
                        questionId
                    );

                    showWrongNote();

                }

            }
        );

    });

}
wrongNoteBtn.addEventListener(
    "click",
    showWrongNote
);

backHomeBtn.addEventListener(
    "click",
    ()=>{

        wrongNoteScreen.classList.remove(
            "active"
        );

        homeScreen.classList.add(
            "active"    
        );
        updateHomeButton();

    }
);

clearNoteBtn.addEventListener(
    "click",
    ()=>{

        if(
            confirm(
                "오답노트를 초기화할까요?"
            )
        ){

            clearWrongQuestions();

            showWrongNote();

        }

    }
);

nextBtn.addEventListener(
    "click",
    ()=>{

        currentQuestionIndex++;

        if(
            currentQuestionIndex >=
            selectedQuestions.length
        ){

            showResult();

        }else{

            showQuestion();

        }

    }
);

retryWrongBtn.addEventListener(
    "click",
    ()=>{

        if(isRetryMode){

            showWrongNote();

            return;

        }

        if(
            wrongQuestionsThisRound.length === 0
        ){

            return;

        }

        selectedQuestions =
            [...wrongQuestionsThisRound];

        currentQuestionIndex = 0;

        score = 0;

        isRetryMode = true;

        resultScreen.classList.remove(
            "active"
        );

        quizScreen.classList.add(
            "active"
        );

        showQuestion();

    }
);

studyWrongBtn.addEventListener(
    "click",
    ()=>{

        const wrongQuestions =
            getWrongQuestions();

        if(
            wrongQuestions.length === 0
        ){

            alert(
                "오답노트가 비어있습니다."
            );

            return;

        }

        selectedQuestions =
            wrongQuestions.map(
                item =>
                item.question
            );

        currentQuestionIndex = 0;

        score = 0;

        isRetryMode = true;

        wrongNoteScreen.classList.remove(
            "active"
        );

        quizScreen.classList.add(
            "active"
        );

        showQuestion();

    }
);
homeBtn.addEventListener(
    "click",
    ()=>{

        if(
            confirm(
                "홈 화면으로 이동할까요?"
            )
        ){

            quizScreen.classList.remove(
                "active"
            );

            resultScreen.classList.remove(
                "active"
            );

            wrongNoteScreen.classList.remove(
                "active"
            );

            homeScreen.classList.add(
                "active"
            );

        }

    }
);
function updateHomeButton(){

    if(
        homeScreen.classList.contains(
            "active"
        )
    ){

        homeBtn.style.display =
            "none";

    }else{

        homeBtn.style.display =
            "block";

    }

}