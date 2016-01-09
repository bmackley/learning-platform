import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

@Component({
	selector: 'view-problem',
	templateUrl: 'components/view-problem/view-problem.html'
})

@RouteConfig([
    { path: '/view-problem/:username/:problemNumber', component: ViewProblemComponent }
])

export class ViewProblemComponent {

	constructor() {

				/*http
					.get('https://github.com/login/oauth/authorize?client_id=myClientId')
					.map(res => res.json())
					.subscribe()*/

			OAuth.callback('github').done(function(result) {
				alert(result.access_token);


			})
			.fail(function(err) {

			});


	}

}
