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
        console.log('getById');
        console.log(id);
        console.log(username);
        const path = problemsPath + id;
        console.log(path);
        console.log('*************************');
        console.log(this.firebaseService);
        console.log(this.firebaseService.retrieve);
        const problem = await this.firebaseService.retrieve(path);
        return problem;
    }
}
