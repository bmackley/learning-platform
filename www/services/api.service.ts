export const API = {
    correctAttempt: (problemId) => {
        parent.postMessage('correct attempt on problem: ' + problemId, '*');
    },
    incorrectAttempt: (problemId) => {
        parent.postMessage('incorrect attempt on problem: ' + problemId, '*');
    }
};
