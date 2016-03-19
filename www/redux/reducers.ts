import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    switch(action.type) {
        case Actions.setProblem.type: {
            const newState = Object.assign({}, state);

            newState.currentViewProblem = {
                text: action.text,
                code: action.code,
                answer: action.answer
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
        default: {
            return state;
        }
    }
}
