import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {RouteParams} from 'angular2/router';
import {ProblemModel} from '../../models/problem.model.ts';
import {CodeMirrorComponent} from '../code-mirror/code-mirror.component.ts';
import {Actions} from '../../redux/actions.ts';

@Component({
	selector: 'edit-problem',
	template: `
        <sm-code-mirror></sm-code-mirror>
        <button (click)="saveProblem()">Save</button>
    `,
    directives: [CodeMirrorComponent]
})

export class EditProblemComponent {

	private problemId: String
    private store;
    private text;
    private code;
    private unsubscribe;

	constructor(@Inject(Constants.REDUX_STORE) store, routeParams: RouteParams) {
        this.store = store;
    	this.problemId = routeParams.get('problem-id');

        this.unsubscribe = store.subscribe(this.mapStateToThis(store));
	}

	saveProblem(text: string, code: string) {
		Actions.saveEditProblem.execute(this.store, this.problemId, {
			text: text,
			code: code
		});
	}

    mapStateToThis(store) {
        return () => {
            const state = store.getState();

            this.text = state.currentEditProblem.text;
            this.code = state.currentEditProblem.code;
        };
    }

    ngOnDestory() {
        this.unsubscribe();
    }

}
