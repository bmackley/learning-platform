import {Component} from 'angular2/core';
import {Problem} from '../../interfaces/ProblemInterface.ts';
import {RouteParams} from 'angular2/router';
import {GitHubService} from '../../services/GitHubService.ts';

@Component({
	selector: 'view-problem',
	templateUrl: 'www/components/view-problem/view-problem.html',
    providers: [GitHubService]
})

export class ViewProblemComponent {

	public text: String;
	public code: String;

	constructor(routeParams: RouteParams, public gitHubService: GitHubService) {
		this.getProblem(routeParams.get('username'), routeParams.get('problem-id'));
	}

	private async getProblem(username: String, problemId: String) {

		const problem = await this.gitHubService.getProblem(username, problemId);

		console.log(problem.text);
		console.log(problem.code);

		this.text = problem.text;
		this.code = problem.code;
	}

}
