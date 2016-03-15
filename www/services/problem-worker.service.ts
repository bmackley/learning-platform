onmessage = function(e) {

    const userCode = e.data.userCode;
    const userVariables = e.data.userVariables;

    const generateRandomInteger = (min, max) => {
        //returns a random integer between min (included) and max (included)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handler = {
        set: (target, key, value, receiver) => {
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
        get: (target, prop, receiver) => {
            return function() {
                return target.value;
            };
        }
    };

    const createUserVariableObjects = userVariables.reduce((prev, curr) => {
        return `${prev} var ${curr}_orig_object = { min: 1, max: 10, value: generateRandomInteger(1, 10) };`;
    }, '');

    const createProxies = userVariables.reduce((prev, curr) => {
        return `${prev} var ${curr} = new Proxy(${curr}_orig_object, handler);`;
    }, '');

    eval(createUserVariableObjects);
    eval(createProxies);
    eval(userCode);

    if (typeof answer !== 'string' || typeof answer !== 'number') {
        //the answer is probably still a proxy object. It must be converted to its value
        answer = +answer;
    }

    const userVariableValues = userVariables.map((element) => {
        return {
            name: element,
            value: eval(`+${element}`)
        };
    });

    postMessage({
        answer,
        userVariableValues
    }); //TODO There is a second parameter to postMessage that I might need to add here in the future. The second parameter specifies the domain that can receive the message
};
