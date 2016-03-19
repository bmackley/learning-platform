import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {ProblemModel} from '../../models/problem.model.ts';
import {CkeditorComponent} from '../ckeditor/ckeditor.component.ts';
import {CodeMirrorComponent} from '../code-mirror/code-mirror.component.ts';
import {Actions} from '../../redux/actions.ts';

@Component({
	selector: 'edit-problem',
	template: `
        <a [routerLink]="['ViewProblem', { username: 'lastmjs', 'problem-id': problemId }]">View Problem</a>

        <div style="display: flex; flex-direction: row; margin-top: 25px;">
            <sm-ckeditor [originalText]="originalText" style="flex: 1; margin-right: 25px"></sm-ckeditor>
            <sm-code-mirror [originalCode]="originalCode" style="flex: 1"></sm-code-mirror>
        </div>

        <button (click)="saveProblem()">Save</button>
    `,
    directives: [CkeditorComponent, CodeMirrorComponent, ROUTER_DIRECTIVES]
})

export class EditProblemComponent {

	private problemId: String
    private store;
    private originalText;
    private originalCode;
    private currentText;
    private currentCode;
    private unsubscribe;

	constructor(@Inject(Constants.REDUX_STORE) store, routeParams: RouteParams) {
        this.store = store;
    	this.problemId = routeParams.get('problem-id');

        this.unsubscribe = store.subscribe(this.mapStateToThis(store));

        if (this.problemId) {
            this.getOriginalProblem();
        }
	}

    async getOriginalProblem() {
        const problem = await ProblemModel.getById(this.problemId);

        this.originalText = problem.text;
        this.originalCode = problem.code;
    }

	saveProblem() {
		Actions.saveEditProblem.execute(this.store, this.problemId, {
			text: this.currentText,
			code: this.currentCode
		});
	}

    mapStateToThis(store) {
        return () => {
            const state = store.getState();

            console.log(state);

            this.currentText = state.currentEditProblem.text;
            this.currentCode = state.currentEditProblem.code;
        };
    }

    ngOnDestory() {
        this.unsubscribe();
    }

}
