const MIN_QUALITY_QUESTION_ID = 1000;
const MIN_QUALITY_EXPLANATION_LENGTH = 30;
const ACTIVE_DIFFICULTIES = new Set([
    "hard"
]);
const seenQuestionTexts = new Set();

const QUESTIONS = [

    ...ANCIENT_QUESTIONS,

    ...UNIFIED_QUESTIONS,

    ...GORYEO_QUESTIONS,

    ...JOSEON_QUESTIONS,

    ...MODERN_QUESTIONS

].filter(question =>
    Number.isInteger(question.id) &&
    question.id >= MIN_QUALITY_QUESTION_ID &&
    ACTIVE_DIFFICULTIES.has(question.difficulty) &&
    typeof question.explanation === "string" &&
    question.explanation.trim().length >= MIN_QUALITY_EXPLANATION_LENGTH
).filter(question => {
    const normalizedQuestion =
        question.question.trim();

    if(seenQuestionTexts.has(normalizedQuestion)){
        return false;
    }

    seenQuestionTexts.add(normalizedQuestion);
    return true;
}
);

window.QUESTIONS = QUESTIONS;
