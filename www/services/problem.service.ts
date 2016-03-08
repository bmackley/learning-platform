import {Injectable} from 'angular2/core';
import {FirebaseService} from './firebase.service.ts';

const problemsPath = 'problems/';

@Injectable()
export class ProblemService {

    private firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.firebaseService = firebaseService;
    }

    async save(id, data) {
        if (id) {
            const path = problemsPath + id;
            await (this.firebaseService.set(path, data));
        }
        else {
            const path = problemsPath;
            await (this.firebaseService.push(path, data));
        }
    }

    async getById(id, username) {
        const path = problemsPath + id;
        const problem = await this.firebaseService.get(path);
        return problem;
    }
}
