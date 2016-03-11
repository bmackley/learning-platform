import {ProblemModel} from '../models/problem.model.ts';

export const Actions = {
    setProblem: {
        type: 'SET_PROBLEM',
        execute: async (store, problemId) => {
            const problem = await ProblemModel.getById(problemId);

            var problemWorker = new Worker('services/problem-worker.service.ts');

            problemWorker.postMessage(problem.code);

            problemWorker.onmessage = (e) => {
                const answer = e.data.toString();

                store.dispatch({
                    type: Actions.setProblem.type,
                    text: problem.text,
                    code: problem.code,
                    answer: answer
                });
            };
        }
    }
};
