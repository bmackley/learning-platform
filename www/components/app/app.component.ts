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
    { name: 'ViewProblem', path: '/view-problem/:username/:problem-id', component: ViewProblemComponent },
	{ name: 'EditExistingProblem', path: '/edit-problem/:problem-id', component: EditProblemComponent },
    { name: 'EditNewProblem', path: '/edit-problem', component: EditProblemComponent }
])

export class AppComponent {

	constructor() {

	}

}
