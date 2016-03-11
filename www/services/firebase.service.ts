export const FirebaseService = {
    set: (path, data) => {
        const ref = new Firebase(`https://resplendent-fire-9351.firebaseio.com/${path}`);
        ref.set(data);
    },
    push: (path, data) => {
        const ref = new Firebase(`https://resplendent-fire-9351.firebaseio.com/${path}`);
        ref.push(data);
    },
    get: async (path) => {
        const ref = new Firebase(`https://resplendent-fire-9351.firebaseio.com/${path}`);
        const dataSnapshot = await ref.once('value');
        return dataSnapshot.val();
    }
};
