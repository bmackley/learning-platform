import {Injectable} from 'angular2/core';

@Injectable()
export class FirebaseService {

    constructor() {
    }

    set(path, data) {
        const ref = new Firebase(`https://resplendent-fire-9351.firebaseio.com/${path}`);
        ref.set(data);
    }

    push(path, data) {
        const ref = new Firebase(`https://resplendent-fire-9351.firebaseio.com/${path}`);
        ref.push(data);
    }

    async get(path) {
        console.log('async get');
        console.log(new Firebase(`https://resplendent-fire-9351.firebaseio.com/${path}`));
        console.log(path);
        let ref = new Firebase(`https://resplendent-fire-9351.firebaseio.com/${path}`);
        console.log(ref);
        const dataSnapshot = await ref.once('value');
        console.log(dataSnapshot);
        return dataSnapshot.val();
    }
}
