onmessage = function(e) {

    function generateRandomInteger(min, max) {
        //returns a random integer between min (included) and max (included)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var handler = {
        set: function(target, key, value, receiver) {

            if (key === 'min') {
                target.min = value;
                target.value = generateRandomInteger(target.min, target.max);
            }

            if (key === 'max') {
                target.max = value;
                target.value = generateRandomInteger(target.min, target.max);
            }

            if (key === 'precision') {
                target.value = value;
            }
        },
        get: function(target, prop, receiver) {
            return function() {
                return target.value;
            };
        }
    };

    //these strings are grabbed from the user text. The variables in the user text are defined thusly: {{num1}}
    var userVariables = [
        'num1',
        'num2'
    ];

    var createUserVariableObjects = userVariables.reduce(function(prev, curr) {
        return prev + 'var ' + curr + '_orig_object' + ' = { min: 1, max: 10, value: generateRandomInteger(1, 10) };';
    }, '');

    var createProxies = userVariables.reduce(function(prev, curr) {
        return prev + curr + ' = new Proxy(' + curr + '_orig_object' + ', handler);';
    }, '');

    var answer;
    eval(createUserVariableObjects);
    eval(createProxies);
    eval(e.data);

    console.log(answer);

    postMessage(answer); //TODO There is a second parameter to postMessage that I might need to add here in the future. The second parameter specifies the domain that can receive the message
};
