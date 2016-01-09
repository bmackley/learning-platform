import {Component} from 'angular2/core';
import {OAuthService} from '../../services/OAuthService.ts';
import {GitHubService} from '../../services/GitHubService.ts';
import {RouteParams} from 'angular2/router';

@Component({
	selector: 'edit-problem',
	templateUrl: 'components/edit-problem/edit-problem.html',
    providers: [OAuthService, GitHubService]
})

export class EditProblemComponent {

	private userAuthToken: String;
	private username: String;
	private problemId: String

	constructor(oAuthService: OAuthService, routeParams: RouteParams, public gitHubService: GitHubService) {

		this.username = routeParams.get('username');
		this.problemId = routeParams.get('problem-id');

        oAuthService.authenticate('edit-problem', this.username, this.problemId, (token: String) => {
			this.userAuthToken = token;

			this.saveProblem();
		});


	}

	saveProblem() {

		this.gitHubService.saveProblem(this.userAuthToken, this.username, this.problemId, 'text', 'code');

	}

}
