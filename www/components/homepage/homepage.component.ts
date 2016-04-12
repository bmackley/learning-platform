import {Component, OnInit, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

import { Router, RouteParams } from 'angular2/router';
import {Subject } from '../subject/subject'
import { SubjectService } from '../../services/subject.service';

@Component({
	selector: 'homepage',
	templateUrl: 'components/homepage/homepage.component.html'
})

export class HomepageComponent {

	subjects: Subject[] = [];
  private _routeParams: RouteParams;
  constructor(private _router: Router) { }
  gotoDetail(subject: Subject) {
    let link = ['SubjectDetail', { id: subject.id }];
    this._router.navigate(link);
  }
  gotoLogin(){
    this._router.navigate(['Login']);
  }
  gotoSignUp(){
    this._router.navigate(['Signup']);
  }


}
