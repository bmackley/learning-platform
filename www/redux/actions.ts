import {ProblemModel} from '../models/problem.model.ts';

export const Actions = {
    getViewProblem: {
        type: 'GET_VIEW_PROBLEM',
        execute: (store, problemId) => {
            return new Promise(async function(resolve, reject) {
                const problem = await ProblemModel.getById(problemId);

                const reUserVariables = /{{(.*?)}}/g;
                const retrieveUserVariables = (matches) => {
                    const match = reUserVariables.exec(problem.text);

                    if (!match) {
                        return matches;
                    }

                    return retrieveUserVariables([...matches, match[1]]);
                };

                const reUserInputs = /\[\[(.*?)\]\]/g;
                const retrieveUserInputs = (matches) => {
                    const match = reUserInputs.exec(problem.text);

                    if (!match) {
                        return matches;
                    }

                    return retrieveUserInputs([...matches, match[1]]);
                };

                const reUserCheckboxes = /\[x\](.*?)\[x\]/g;
                const retrieveUserCheckboxes = (matches) => {
                    const match = reUserCheckboxes.exec(problem.text);

                    if (!match) {
                        return matches;
                    }

                    return retrieveUserCheckboxes([...matches, match[1]]);
                };

                const reUserRadios = /\[\*\](.*?)\[\*\]/g;
                const retrieveUserRadios = (matches) => {
                    const match = reUserRadios.exec(problem.text);

                    if (!match) {
                        return matches;
                    }

                    return retrieveUserRadios([...matches, match[1]]);
                };

                const userVariables = retrieveUserVariables([]);
                const userInputs = retrieveUserInputs([]);
                const userCheckboxes = retrieveUserCheckboxes([]);
                const userRadios = retrieveUserRadios([]);

                const problemWorker = new Worker('services/problem-worker.service.ts');
                problemWorker.postMessage({
                    userVariables,
                    userInputs,
                    userCode: problem.code
                });

                problemWorker.onmessage = (e) => {
                    const result = e.data;
                    const answer = result.answer;
                    const userVariableValues = result.userVariableValues;

                    const userVariableReplacedText = userVariableValues.reduce((prev, curr) => {
                        const re = new RegExp(`{{${curr.name}}}`);
                        return prev.replace(re, curr.value);
                    }, problem.text);

                    const userInputReplacedText = userInputs.reduce((prev, curr) => {
                        const re = new RegExp(`\\[\\[${curr}\\]\\]`);
                        return prev.replace(re, `
                            <span id="${curr}" contenteditable="true" class="user-input"></span>
                            <style>
                                .user-input {
                                    display: inline-block;
                                    min-width: 25px;
                                    padding: 5px;
                                    box-shadow: 0px 0px 1px black;
                                }
                            </style>
                        `);
                    }, userVariableReplacedText);

                    const userCheckboxReplacedText = userCheckboxes.reduce((prev, curr) => {
                        const re = new RegExp(`\\[x\\]${curr}\\[x\\]`);
                        return prev.replace(re, `
                            <input id="${curr}" type="checkbox">
                        `);
                    }, userInputReplacedText);

                    const userRadioReplacedText = userRadios.reduce((prev, curr) => {
                        const re = new RegExp(`\\[\\*\\]${curr}\\[\\*\\]`);
                        return prev.replace(re, `
                            <input id="${curr}" type="radio" name="this-might-break-if-the-user-has-more-than-one-group">
                        `);
                    }, userCheckboxReplacedText);

                    store.dispatch({
                        type: Actions.getViewProblem.type,
                        uid: problem.uid,
                        text: userRadioReplacedText,
                        code: problem.code,
                        answer,
                        userInputs,
                        userCheckboxes,
                        userRadios
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
    },
    setCurrentUser: {
        type: 'SET_CURRENT_USER',
        execute: (store, uid, email) => {
            store.dispatch({
                type: Actions.setCurrentUser.type,
                uid,
                email
            })
        }
    }
};
