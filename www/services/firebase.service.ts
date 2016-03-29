const set = (path, data) => {
    const ref = new Firebase(`"https://e3education.firebaseio.com/"/${path}`);
    ref.set(data);
};

const push = (path, data) => {
    const ref = new Firebase(`"https://e3education.firebaseio.com/"/${path}`);
    const newId = ref.push(data).key();

    return newId;
};

const get = async (path) => {
    const ref = new Firebase(`"https://e3education.firebaseio.com/"/${path}`);
    const dataSnapshot = await ref.once('value');
    return dataSnapshot.val();
};

const createUser = async (email, password) => {
    const ref = new Firebase(`"https://e3education.firebaseio.com/"`);

    const userData = await ref.createUser({
        email,
        password
    });

    return userData;
};

const logInUser = async (email, password) => {
    const ref = new Firebase(`"https://e3education.firebaseio.com/"`);

    const authData = await ref.authWithPassword({
        email,
        password
    });

    return authData;
};

const logOutUser = () => {
    const ref = new Firebase(`"https://e3education.firebaseio.com/"`);
    ref.unauth();
};

const isUserLoggedIn = () => {
    const ref = new Firebase(`"https://e3education.firebaseio.com/"`);
    return ref.getAuth();
};

export const FirebaseService = {
    set,
    push,
    get,
    createUser,
    logInUser,
    logOutUser,
    isUserLoggedIn
};
