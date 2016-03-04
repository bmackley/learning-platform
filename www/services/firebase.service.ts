import {Injectable} from 'angular2/core';

@Injectable()
export class FirebaseService {

    constructor() {
    }

    set(ref, data) {
        ref.set(data);
    }

    push(ref, data) {
        ref.push(data);
    }
}
