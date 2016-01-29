import {Injectable} from 'angular2/core';
import {FirebaseService} from './firebase.service.ts';

@Injectable()
export class ProblemService {

    private firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.firebaseService = firebaseService;
    }

    save(key, data) {

        if (key) {
            const path = `problems/${key}`;
            this.firebaseService.setToDB(path, data);
        }
        else {
            const path = 'problems';
            this.firebaseService.pushToDB(path, data);
        }
    }
}
