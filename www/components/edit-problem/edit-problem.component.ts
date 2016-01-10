import {Component} from 'angular2/core';
import {OAuthService} from '../../services/o-auth.service.ts';
import {GitHubService} from '../../services/github.service.ts';
import {RouteParams} from 'angular2/router';

@Component({
	selector: 'edit-problem',
	templateUrl: 'www/components/edit-problem/edit-problem.html',
    providers: [OAuthService, GitHubService]
})

export class EditProblemComponent {

	private username: String;
	private problemId: String

	constructor(oAuthService: OAuthService, routeParams: RouteParams, public gitHubService: GitHubService) {

		this.username = routeParams.get('username');
		this.problemId = routeParams.get('problem-id');

        oAuthService.authenticate('edit-problem', this.username, this.problemId);


	}

	saveProblem(text: String, code: String) {
		this.gitHubService.saveProblem(this.username, this.problemId, text, code);
	}

}
