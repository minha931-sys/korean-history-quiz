const STORAGE_KEYS = {

    BEST_SCORE: "hm_best_score",

    PLAY_COUNT: "hm_play_count",

    WRONG_NOTE: "hm_wrong_note",

    STREAK_COUNT: "hm_streak_count",

    LAST_STUDY_DATE: "hm_last_study_date",
    RECENT_RESULTS: "hm_recent_results",
    CATEGORY_STATS: "hm_category_stats"

};

function storageGetItem(key){

    try{

        return localStorage.getItem(key);

    }

    catch{

        return null;

    }

}

function storageSetItem(key, value){

    try{

        localStorage.setItem(
            key,
            value
        );

    }

    catch{

        // 학습 기록 저장이 제한된 환경에서도 퀴즈 이용은 계속 가능하게 둡니다.

    }

}

function storageRemoveItem(key){

    try{

        localStorage.removeItem(key);

    }

    catch{

        // 저장소 접근이 차단된 경우 무시합니다.

    }

}

function safeParse(
    value,
    fallback
){

    try{

        return JSON.parse(
            value
        ) || fallback;

    }

    catch{

        return fallback;

    }

}

function saveStats(score){

    const currentBest =
        getBestScore();

    const currentPlayCount =
        getPlayCount();

    if(score > currentBest){

        storageSetItem(
            STORAGE_KEYS.BEST_SCORE,
            score
        );

    }

    storageSetItem(
        STORAGE_KEYS.PLAY_COUNT,
        currentPlayCount + 1
    );

    loadStats();

}

function getBestScore(){

    return Number(

        storageGetItem(
            STORAGE_KEYS.BEST_SCORE
        )

    ) || 0;

}

function getPlayCount(){

    return Number(

        storageGetItem(
            STORAGE_KEYS.PLAY_COUNT
        )

    ) || 0;

}

function loadStats(){

    const streakElement =

        document.getElementById(
            "streak-count"
        );

    if(streakElement){

        streakElement.textContent =

            `${getStreakCount()}일`;

    }

    const recentElement =

        document.getElementById(
            "recent-accuracy"
        );

    if(recentElement){

        const accuracy =
            getRecentAccuracy();

        recentElement.textContent =

            accuracy === "-"
            ? "-"
            : `${accuracy}%`;

    }

}

function getWrongQuestions(){

    return safeParse(

        storageGetItem(
            STORAGE_KEYS.WRONG_NOTE
        ),

        []

    );

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

    storageSetItem(

        STORAGE_KEYS.WRONG_NOTE,

        JSON.stringify(
            wrongQuestions
        )

    );

}

function clearWrongQuestions(){

    storageRemoveItem(
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

    storageSetItem(

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

    storageSetItem(

        STORAGE_KEYS.WRONG_NOTE,

        JSON.stringify(
            filteredQuestions
        )

    );

}
function updateStreak(){

    const now =
        new Date();

    const today =

        `${now.getFullYear()}-${
            String(
                now.getMonth() + 1
            ).padStart(2,"0")
        }-${
            String(
                now.getDate()
            ).padStart(2,"0")
        }`;
    const lastDate =

        storageGetItem(
            STORAGE_KEYS.LAST_STUDY_DATE
        );

    let streak =

        Number(

            storageGetItem(
                STORAGE_KEYS.STREAK_COUNT
            )

        ) || 0;

    if(lastDate === today){

        return;

    }

    if(lastDate){

        const diffDays =

            Math.floor(

                (
                    new Date(today)
                    -
                    new Date(lastDate)
                )

                /

                (1000 * 60 * 60 * 24)

            );

        if(diffDays === 1){

            streak++;

        }

        else{

            streak = 1;

        }

    }

    else{

        streak = 1;

    }

    storageSetItem(

        STORAGE_KEYS.STREAK_COUNT,

        streak

    );

    storageSetItem(

        STORAGE_KEYS.LAST_STUDY_DATE,

        today

    );

}

function getStreakCount(){

    return Number(

        storageGetItem(
            STORAGE_KEYS.STREAK_COUNT
        )

    ) || 0;

}
function getRecentResults(){

    return safeParse(

        storageGetItem(
            STORAGE_KEYS.RECENT_RESULTS
        ),

        []

    );

}

function saveRecentResult(isCorrect){

    const results =
        getRecentResults();

    results.push(isCorrect);

    if(results.length > 20){

        results.shift();

    }

    storageSetItem(

        STORAGE_KEYS.RECENT_RESULTS,

        JSON.stringify(results)

    );

}

function getRecentAccuracy(){

    const results =
        getRecentResults();

    if(results.length === 0){

        return "-";

    }

    const correctCount =

        results.filter(
            result => result
        ).length;

    return Math.round(

        correctCount /
        results.length *
        100

    );

}
function getCategoryStats(){

    return safeParse(

        storageGetItem(
            STORAGE_KEYS.CATEGORY_STATS
        ),

        {}

    );

}

function saveCategoryResult(
    category,
    isCorrect
){

    const stats =
        getCategoryStats();

    if(!stats[category]){

        stats[category] = {

            total: 0,

            correct: 0

        };

    }

    stats[category].total++;

    if(isCorrect){

        stats[category].correct++;

    }

    storageSetItem(

        STORAGE_KEYS.CATEGORY_STATS,

        JSON.stringify(stats)

    );

}
function getTotalSolvedCount(){

    const stats =
        getCategoryStats();

    let total = 0;

    Object.values(stats)
        .forEach(item => {

            total += item.total;

        });

    return total;

}

function getWeakestCategory(){

    const stats =
        getCategoryStats();

    let weakestCategory =
        null;

    let lowestAccuracy =
        101;

    Object.entries(stats)
        .forEach(
            ([category,data]) => {

                if(
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

            }
        );

    return weakestCategory;

}
function getStrongestCategory(){

    const stats =
        getCategoryStats();

    let strongestCategory =
        "";

    let highestAccuracy =
        -1;

    Object.entries(stats)
        .forEach(
            ([category,data])=>{

                if(
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
                    accuracy >
                    highestAccuracy
                ){

                    highestAccuracy =
                        accuracy;

                    strongestCategory =
                        category;

                }

            }
        );

    return {

        category:
            strongestCategory,

        accuracy:
            highestAccuracy

    };

}
