import {ProblemModel} from '../models/problem.model.ts';

export const Actions = {
    setProblem: {
        type: 'SET_PROBLEM',
        execute: async (store, problemId) => {
            const problem = await ProblemModel.getById(problemId);

            const re = /{{(.*?)}}/g;
            const retrieveUserVariables = (matches) => {

                const match = re.exec(problem.text);

                if (!match) {
                    return matches;
                }

                return retrieveUserVariables([...matches, match[1]]);
            };

            const userVariables = retrieveUserVariables([]);

            const problemWorker = new Worker('services/problem-worker.service.ts');
            problemWorker.postMessage({
                userVariables,
                userCode: problem.code
            });

            problemWorker.onmessage = (e) => {
                const result = e.data;
                const answer = result.answer.toString();
                const userVariableValues = result.userVariableValues;

                const text = userVariableValues.reduce((prev, curr) => {
                    const re = new RegExp(`{{${curr.name}}}`);
                    return prev.replace(re, curr.value);
                }, problem.text);

                store.dispatch({
                    type: Actions.setProblem.type,
                    text,
                    code: problem.code,
                    answer
                });
            };
        }
    }
};
