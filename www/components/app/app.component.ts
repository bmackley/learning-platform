import {Component, Inject} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {ViewProblemComponent} from '../view-problem/view-problem.component.ts';
import {EditProblemComponent} from '../edit-problem/edit-problem.component.ts';
import {LoginComponent} from '../login/login.component.ts';
import {SignupComponent} from '../signup/signup.component.ts';
import {HomepageComponent} from '../homepage/homepage.component.ts';

import { SubjectService }     from '../../services/subject.service.ts';
import { SubjectsComponent } from '../subject/subjects.component.ts';
import { ConceptsComponent } from '../concept/concepts.component.ts';
import { ConceptService } from '../../services/concept.service.ts';
import { SubjectDetailComponent} from '../subject/subject-detail.component.ts';
import { QuestionsComponent } from '../question/questions.component.ts'
import { NavbarComponent } from '../navbar/navbar.component.ts'

import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';


@Component({
	selector: 'app',
	templateUrl: 'components/app/app.html',
	directives: [ROUTER_DIRECTIVES, NavbarComponent],
	providers: [
    ROUTER_PROVIDERS,
    SubjectService,
    ConceptService,
  ]
})

@RouteConfig([
    { name: 'ViewProblem', path: '/view-problem/:problem-id', component: ViewProblemComponent },
		{ name: 'EditExistingProblem', path: '/edit-problem/:problem-id', component: EditProblemComponent },
    { name: 'EditNewProblem', path: '/edit-problem', component: EditProblemComponent },
    { name: 'Signup', path: '/signup', component: SignupComponent },
    { name: 'Login', path: '/login', component: LoginComponent },
		{ name: 'Homepage', path: '/homepage', component: HomepageComponent, useAsDefault: true },
		{
	    path: '/subjects',
	    name: 'Subjects',
	    component: SubjectsComponent
	  },
		{
	    path: '/concepts',
	    name: 'Concepts',
	    component: ConceptsComponent
	  },
		{
	    path: '/questions',
	    name: 'Questions',
	    component: QuestionsComponent
	  },
])

export class AppComponent {
	private unsubscribe;
	private loggedIn = false;
	public username;
	constructor(@Inject(Constants.REDUX_STORE) store){
		this.unsubscribe = store.subscribe(this.mapStateToThis(store));
		this.loggedIn = false;
	}
	mapStateToThis(store) {
			return () => {
					const state = store.getState();
					this.username = state.currentUser.email;
			};
	}
}
