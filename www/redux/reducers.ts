import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    switch(action.type) {
        case Actions.getViewProblem.type: {
            const newState = Object.assign({}, state);

            newState.currentViewProblem = {
                text: action.text,
                code: action.code,
                answer: action.answer,
                userInputs: action.userInputs,
                userCheckboxes: action.userCheckboxes,
                userRadios: action.userRadios
            };

            return newState;
        }
        case Actions.setEditProblemText.type: {
            const newState = Object.assign({}, state);

            newState.currentEditProblem.text = action.text;

            return newState;
        }
        case Actions.setEditProblemCode.type: {
            const newState = Object.assign({}, state);

            newState.currentEditProblem.code = action.code;

            return newState;
        }
        case Actions.saveEditProblem.type: {
            const newState = Object.assign({}, state);

            newState.currentEditProblem.id = action.problemId;

            return newState;
        }
        case Actions.setCurrentUser.type: {
            const newState = Object.assign({}, state);

            newState.currentUser = {
                uid: action.uid,
                email: action.email
            };

            return newState;
        }
        default: {
            return state;
        }
    }
}
