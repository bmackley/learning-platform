import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {ProblemModel} from '../../models/problem.model.ts';
import {CkeditorComponent} from '../ckeditor/ckeditor.component.ts';
import {CodeMirrorComponent} from '../code-mirror/code-mirror.component.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

@Component({
	selector: 'edit-problem',
	template: `
        <a [routerLink]="['ViewProblem', { username: 'lastmjs', 'problem-id': problemId }]">View Problem</a>

        <div class="sm-editor-container" style="display: flex; flex-direction: column">
            <sm-ckeditor [originalText]="originalText"></sm-ckeditor>
            <sm-code-mirror [originalCode]="originalCode" style="margin-top: 25px"></sm-code-mirror>
        </div>

        <button (click)="saveProblem()">Save</button>

        <style>
            .sm-editor-container {
                /*TODO: this is the same exact class as sm-problem-code*/
                margin-top: 10vh;
                margin-bottom: 10vh;
                margin-left: 5vw;
                margin-right: 5vw;
            }
        </style>
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
    private currentUser;

	constructor(@Inject(Constants.REDUX_STORE) store, routeParams: RouteParams, router: Router) {

        //TODO put this in an action of its own
        const authData = FirebaseService.isUserLoggedIn();

        if (!authData) {
            router.navigate(['Login']);
        }
        else {
            Actions.setCurrentUser.execute(store, authData.uid, authData.password.email);
        }

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

        Actions.setEditProblemText.execute(this.store, this.originalText);
        Actions.setEditProblemCode.execute(this.store, this.originalCode);
    }

	saveProblem() {
		Actions.saveEditProblem.execute(this.store, this.problemId, {
            uid: this.currentUser.uid,
            text: this.currentText,
			code: this.currentCode
		});
	}

    mapStateToThis(store) {
        return () => {
            const state = store.getState();

            this.currentText = state.currentEditProblem.text;
            this.currentCode = state.currentEditProblem.code;
            this.currentUser = state.currentUser;
        };
    }

    ngOnDestory() {
        this.unsubscribe();
    }

}
