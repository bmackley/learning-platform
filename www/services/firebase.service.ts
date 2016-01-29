import {Injectable} from 'angular2/core';

@Injectable()
export class FirebaseService {

    constructor() {
    }

    getDBRef(path) {
        return new Firebase(`https://resplendent-fire-9351.firebaseio.com/${path}`);
    }

    setToDB(path, data) {
        console.log(path);
        console.log(data);

        const dbRef = this.getDBRef(path);

        dbRef.set(data);
    }

    pushToDB(path, data) {
        console.log(path);
        console.log(data);

        const dbRef = this.getDBRef(path);

        dbRef.push(data);
    }
}
