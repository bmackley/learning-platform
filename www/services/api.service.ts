export const API = {
    correctAttempt: () => {
        parent.postMessage('correct attempt', '*');
    },
    incorrectAttemp: () => {
        parent.postMessage('incorrect attempt', '*');
    }
};
