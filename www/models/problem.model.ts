import {FirebaseService} from '../services/firebase.service.ts';

const problemsPath = 'problems/';

const save = async (id, data) => {
    if (id) {
        const path = problemsPath + id;
        await FirebaseService.set(path, data);

        return id;
    }
    else {
        const path = problemsPath;
        return await FirebaseService.push(path, data);
    }
};

const getById = async (id) => {
    const path = problemsPath + id;
    const problem = await FirebaseService.get(path);
    return problem;
};

export const ProblemModel = {
    save,
    getById
};
