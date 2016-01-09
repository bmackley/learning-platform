import {Component} from 'angular2/core';
import {OAuthService} from '../../services/OAuthService.ts';
import {RouteParams} from 'angular2/router';

@Component({
	selector: 'edit-problem',
	templateUrl: 'components/edit-problem/edit-problem.html',
    providers: [OAuthService]
})

export class EditProblemComponent {

	constructor(oAuthService: OAuthService, routeParams: RouteParams) {
		/*http
			.get('https://github.com/login/oauth/authorize?client_id=myClientId')
			.map(res => res.json())
			.subscribe()*/
        oAuthService.authenticate('edit-problem', routeParams.get('username'), routeParams.get('problem-id'));
	}

}
