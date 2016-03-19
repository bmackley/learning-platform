import {ProblemModel} from '../models/problem.model.ts';

export const Actions = {
    getViewProblem: {
        type: 'GET_VIEW_PROBLEM',
        execute: (store, problemId) => {
            return new Promise(async function(resolve, reject) {
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
                        type: Actions.getViewProblem.type,
                        text,
                        code: problem.code,
                        answer
                    });

                    resolve();
                };
            });
        }
    },
    setEditProblemText: {
        type: 'SET_EDIT_PROBLEM_TEXT',
        execute: (store, text) => {
            store.dispatch({
                type: Actions.setEditProblemText.type,
                text
            });
        }
    },
    setEditProblemCode: {
        type: 'SET_EDIT_PROBLEM_CODE',
        execute: (store, code) => {
            store.dispatch({
                type: Actions.setEditProblemCode.type,
                code
            });
        }
    },
    saveEditProblem: {
        type: 'SAVE_EDIT_PROBLEM',
        execute: async (store, id, problem) => {
            const problemId = await ProblemModel.save(id, problem);

            store.dispatch({
                type: Actions.saveEditProblem.type,
                problemId
            });
        }
    }
};
