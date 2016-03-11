import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    switch(action.type) {
        case Actions.setProblem.type: {
            const newState = Object.assign({}, state);

            newState.currentProblem = {
                text: action.text,
                code: action.code,
                answer: action.answer
            };

            return newState;
        }
        default: {
            return state;
        }
    }
}
