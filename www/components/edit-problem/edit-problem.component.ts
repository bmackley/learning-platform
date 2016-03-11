import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
	selector: 'edit-problem',
	templateUrl: 'www/components/edit-problem/edit-problem.html'
})

export class EditProblemComponent {

	private username: String;
	private problemId: String

	constructor(routeParams: RouteParams) {
        //
		// this.problemService = problemService;
        //
		// this.username = routeParams.get('username');
		// this.problemId = routeParams.get('problem-id');

	}

	saveProblem(text: string, code: string) {
		// this.problemService.save(this.problemId, {
		// 	text: text,
		// 	code: code
		// });
	}

}
