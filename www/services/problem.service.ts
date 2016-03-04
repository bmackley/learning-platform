import {Injectable} from 'angular2/core';
import {FirebaseService} from './firebase.service.ts';

const problemsRef = new Firebase(`https://resplendent-fire-9351.firebaseio.com/problems`);

@Injectable()
export class ProblemService {

    private firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.firebaseService = firebaseService;
    }

    save(key, data) {
        if (key) {
            this.firebaseService.set(problemsRef, data);
        }
        else {
            this.firebaseService.push(problemsRef, data);
        }
    }

    async getById(id, username) {

        const problemRef = new Firebase(`https://resplendent-fire-9351.firebaseio.com/problems/${id}`);

        const problemSnapshot = await problemRef.once('value');

        return problemSnapshot.val();
    }
}
