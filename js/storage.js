const STORAGE_KEYS = {

    BEST_SCORE: "hm_best_score",

    PLAY_COUNT: "hm_play_count",

    WRONG_NOTE: "hm_wrong_note"

};

function saveStats(score){

    const currentBest =
        getBestScore();

    const currentPlayCount =
        getPlayCount();

    if(score > currentBest){

        localStorage.setItem(
            STORAGE_KEYS.BEST_SCORE,
            score
        );

    }

    localStorage.setItem(
        STORAGE_KEYS.PLAY_COUNT,
        currentPlayCount + 1
    );

    loadStats();

}

function getBestScore(){

    return Number(

        localStorage.getItem(
            STORAGE_KEYS.BEST_SCORE
        )

    ) || 0;

}

function getPlayCount(){

    return Number(

        localStorage.getItem(
            STORAGE_KEYS.PLAY_COUNT
        )

    ) || 0;

}

function loadStats(){

    const bestScore =
        getBestScore();

    const playCount =
        getPlayCount();

    const bestScoreElement =
        document.getElementById(
            "best-score"
        );

    const playCountElement =
        document.getElementById(
            "play-count"
        );

    if(bestScoreElement){

        bestScoreElement.textContent =
            `${bestScore}점`;

    }

    if(playCountElement){

        playCountElement.textContent =
            `${playCount}회`;

    }

}

function getWrongQuestions(){

    return JSON.parse(

        localStorage.getItem(
            STORAGE_KEYS.WRONG_NOTE
        )

    ) || [];

}

function saveWrongQuestion(question){

    const wrongQuestions =
        getWrongQuestions();

    const existingItem =
        wrongQuestions.find(
            item => item.question.id === question.id
        );

    if(existingItem){

        return;

    }

    wrongQuestions.push({

        question: question,

        reviewCount: 0

    });

    localStorage.setItem(

        STORAGE_KEYS.WRONG_NOTE,

        JSON.stringify(
            wrongQuestions
        )

    );

}

function clearWrongQuestions(){

    localStorage.removeItem(
        STORAGE_KEYS.WRONG_NOTE
    );

}

function increaseReviewCount(questionId){

    const wrongQuestions =
        getWrongQuestions();

    const item =
        wrongQuestions.find(
            item =>
            item.question.id === questionId
        );

    if(item){

        item.reviewCount++;

    }

    localStorage.setItem(

        STORAGE_KEYS.WRONG_NOTE,

        JSON.stringify(
            wrongQuestions
        )

    );

}

function removeWrongQuestion(questionId){

    const wrongQuestions =
        getWrongQuestions();

    const filteredQuestions =
        wrongQuestions.filter(
            item => {

                const q =
                    item.question
                    ? item.question
                    : item;

                return q.id !== questionId;
            }
        );

    localStorage.setItem(

        STORAGE_KEYS.WRONG_NOTE,

        JSON.stringify(
            filteredQuestions
        )

    );

}