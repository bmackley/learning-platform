import {ProblemModel} from '../models/problem.model.ts';

export const Actions = {
    setProblem: {
        type: 'SET_PROBLEM',
        execute: async (store, problemId) => {
            const problem = await ProblemModel.getById(problemId);

            //these strings need to be grabbed from the user text. The variables in the user text are defined thusly: {{num1}}
            const userVariables = [
                'num1',
                'num2'
            ];

            //grab all the user variables here
            const temp = /{{.*}}/.exec(problem.text);

            console.log(temp);

            const text = problem.text;

            const problemWorker = new Worker('services/problem-worker.service.ts');
            problemWorker.postMessage({
                userVariables,
                userCode: problem.code
            });

            problemWorker.onmessage = (e) => {
                const answer = e.data.toString();

                store.dispatch({
                    type: Actions.setProblem.type,
                    text,
                    code: problem.code,
                    answer: answer
                });
            };
        }
    }
};
