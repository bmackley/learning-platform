onmessage = function(e) {
    var answer;
    eval(e.data);
    postMessage(answer);
};
