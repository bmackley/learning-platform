import {Injectable} from 'angular2/core';
import {FirebaseService} from './firebase.service.ts';

const problemsPath = 'problems/';

@Injectable()
export class ProblemService {

    private firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.firebaseService = firebaseService;
    }

    save(id, data) {
        if (id) {
            const path = problemsPath + id;
            this.firebaseService.set(path, data);
        }
        else {
            const path = problemsPath;
            this.firebaseService.push(path, data);
        }
    }

    async getById(id, username) {
        console.log('getById');
        console.log(id);
        console.log(username);
        const path = problemsPath + id;
        console.log(path)
        return await this.firebaseService.get(path);
    }
}
