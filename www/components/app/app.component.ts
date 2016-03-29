import {Component, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ViewProblemComponent} from '../view-problem/view-problem.component.ts';
import {EditProblemComponent} from '../edit-problem/edit-problem.component.ts';
import {LoginComponent} from '../login/login.component.ts';
import {SignupComponent} from '../signup/signup.component.ts';
import {HomepageComponent} from '../homepage/homepage.component.ts';


@Component({
	selector: 'app',
	templateUrl: 'components/app/app.html',
	directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { name: 'ViewProblem', path: '/view-problem/:problem-id', component: ViewProblemComponent },
	{ name: 'EditExistingProblem', path: '/edit-problem/:problem-id', component: EditProblemComponent },
    { name: 'EditNewProblem', path: '/edit-problem', component: EditProblemComponent },
    { name: 'Signup', path: '/signup', component: SignupComponent },
    { name: 'Login', path: '/login', component: LoginComponent },
		{ name: 'Homepage', path: '/homepage', component: HomepageComponent },
])

export class AppComponent {

	public username;
	private unsubscribe;
	constructor(@Inject('REDUX_STORE') store){
		this.unsubscribe = store.subscribe(this.mapStateToThis(store))
	}
	mapStateToThis(store){
		return () => {
				const state = store.getState();
				this.username = state.currentUser.email
		}
	}
	ngOnDestroy(){
			this.unsubscribe;
	}
}
