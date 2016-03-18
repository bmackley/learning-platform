export const API = {
    answerAttempt: (problemId, correct, text, trueAnswer, userAnswer) => {
        console.log({
            problemId,
            correct,
            text,
            trueAnswer,
            userAnswer
        });
        parent.postMessage({
            problemId,
            correct,
            text,
            trueAnswer,
            userAnswer
        }, '*');
    }
};
