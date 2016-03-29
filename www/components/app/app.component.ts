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



@Component({
	selector: 'app',
	templateUrl: 'components/app/app.html',
	directives: [ROUTER_DIRECTIVES],
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
])

export class AppComponent {
	constructor(){

	}
}
