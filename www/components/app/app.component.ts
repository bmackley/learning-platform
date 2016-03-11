import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ViewProblemComponent} from '../view-problem/view-problem.component.ts';
import {EditProblemComponent} from '../edit-problem/edit-problem.component.ts';

@Component({
	selector: 'app',
	templateUrl: 'components/app/app.html',
	directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/view-problem/:username/:problem-id', component: ViewProblemComponent },
	{ path: '/edit-problem/:username/:problem-id', component: EditProblemComponent }
])

export class AppComponent {

	constructor() {

	}

}
