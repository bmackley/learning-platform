onmessage = function(e) {
    var answer;
    eval(e.data);
    postMessage(answer); //TODO There is a second parameter to postMessage that I might need to add here in the future. The second parameter specifies the domain that can receive the message
};
