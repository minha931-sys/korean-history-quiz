const studyWrongBtn =
    document.getElementById(
        "study-wrong-btn"
    );
const analysisBtn =
    document.getElementById(
        "analysis-btn"
    );
const analysisScreen =
    document.getElementById(
        "analysis-screen"
    );

const analysisHomeBtn =
    document.getElementById(
        "analysis-home-btn"
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
analysisHomeBtn.addEventListener(
    "click",
    ()=>{

        analysisScreen.classList.remove(
            "active"
        );

        homeScreen.classList.add(
            "active"
        );

        updateHomeButton();

    }
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

    return shuffle(
        sourceQuestions
    ).slice(
        0,
        Math.min(
            10,
            sourceQuestions.length
        )
    );

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

    updateStreak();

    saveRecentResult(
        index === correctIndex
    );
    saveCategoryResult(

        question.category,

        index === correctIndex

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

function showQuestion(){
    const oldExplanation =
        document.querySelector(
        ".inline-explanation"
    );

    if(oldExplanation){

        oldExplanation.remove();

    }
    const question =
        selectedQuestions[
            currentQuestionIndex
        ];

    questionText.textContent =
        question.question;

    const totalQuestions =
        selectedQuestions.length;

    questionNumber.textContent =
        `문제 ${currentQuestionIndex + 1} / ${totalQuestions}`;

    const progress =
        (
            (currentQuestionIndex + 1)
            / totalQuestions
        ) * 100;

    progressText.textContent =
        `${Math.round(progress)}%`;

    progressFill.style.width =
        `${progress}%`;

    explanationBox.style.display =
        "none";

    explanationBox.innerHTML = "";

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

        }
    );

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
    const accuracy =
        Math.round(
            (score / selectedQuestions.length)
            * 100
        );
    scoreDisplay.innerHTML =
    `${score} / ${selectedQuestions.length}`;

    if(isRetryMode){

        gradeCard.innerHTML =

            `
            🎉 복습 완료
            <br><br>
            정답률 ${accuracy}%
            `;

    }else{

        gradeCard.innerHTML =

            `
            ${getGrade(score)}
            <br><br>
            정답률 ${accuracy}%
            `;

    }

    if(!isRetryMode){

        saveStats(score);

    }
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

점수 : ${score}/${selectedQuestions.length}

${getGrade(score)}

당신은 몇 점 받을 수 있나요?

${window.location.href}`;

    if(navigator.share){

        navigator.share({

            title:
                "한국사 10분 챌린지",

            text:
                text

        });

    }else{

        navigator.clipboard
            .writeText(text);

        alert(
            "결과가 복사되었습니다."
        );

    }

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
    analysisScreen.classList.remove(
    "active"
    );
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
analysisBtn.addEventListener(
    "click",
    showAnalysis
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

            shuffle(

                wrongQuestions.map(
                    item =>
                    item.question
                )

            ).slice(

                0,

            Math.min(
                10,
                wrongQuestions.length
            )

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

            analysisScreen.classList.remove(
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
function showAnalysis(){

    const totalSolved =
        getTotalSolvedCount();

    if(totalSolved < 30){

        alert(

`누적 학습량이 30문제 미만이라
정확한 분석이 어렵습니다.

현재 학습량 : ${totalSolved}문제`

        );

        return;

    }

    homeScreen.classList.remove(
        "active"
    );

    quizScreen.classList.remove(
        "active"
    );

    resultScreen.classList.remove(
        "active"
    );

    wrongNoteScreen.classList.remove(
        "active"
    );

    analysisScreen.classList.add(
        "active"
    );

    updateHomeButton();

    const stats =
        getCategoryStats();

    const content =
        document.getElementById(
            "analysis-content"
        );

    const summary =
        document.getElementById(
            "analysis-summary"
        );

    const strongest =
        getStrongestCategory();

    let html = "";

    let weakestCategory =
        "";

    let lowestAccuracy =
        101;

    const categories = [

        "고조선·삼국",

        "통일신라·발해",

        "고려",

        "조선",

        "근현대"

    ];

    categories.forEach(
        category => {

            const data =
                stats[category];

            if(
                !data ||
                data.total === 0
            ){

                return;

            }

            const accuracy =

                Math.round(

                    data.correct
                    /
                    data.total
                    * 100

                );

            if(
                accuracy <
                lowestAccuracy
            ){

                lowestAccuracy =
                    accuracy;

                weakestCategory =
                    category;

            }

            html += `

<div class="analysis-item">

<h3>${category}</h3>

<div class="analysis-rate">
${accuracy}%
</div>

<div class="analysis-count">
(${data.correct} / ${data.total})
</div>

<div class="analysis-bar">

<div class="analysis-fill"
     style="width:${accuracy}%">
</div>

</div>

</div>

`;

        }
    );

    summary.innerHTML =

    `
    📚 누적 학습량

    <strong>
    ${totalSolved}문제
    </strong>

    <br><br>

    🏆 가장 강한 파트

    <strong>
    ${strongest.category}
    :
    ${strongest.accuracy}%
    </strong>

    <br><br>

    📉 가장 취약한 파트

    <strong style="color:#dc2626;">
    ${weakestCategory}
    :
    ${lowestAccuracy}%
    </strong>
    `;

    content.innerHTML =
        html;

}
