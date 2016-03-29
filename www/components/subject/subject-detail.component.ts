import {Component, OnInit} from 'angular2/core';
import {Subject} from './subject';
import {RouteParams} from 'angular2/router';
import { SubjectService } from './subject.service';

@Component({
  selector: 'my-subject-detail',
  template: `
  <my-subject-detail [subject]="selectedSubject"></my-subject-detail>
  <div *ngIf="subject">
    <h2>{{subject.name}} details!</h2>
    <div><label>id: </label>{{subject.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="subject.name" placeholder="name"/>
    </div>
  </div>
  <p>Hello</p>
  <button (click)="goBack()">Back</button>
  `,
  inputs: ['subject']
})
export class SubjectDetailComponent {
  public subject: Subject;
  constructor(
    private _subjectService: SubjectService,
    private _routeParams: RouteParams) {
  }
  ngOnInit() {
    //the + here converts the string passed by the url into a number
    let id = +this._routeParams.get('id');
    this._subjectService.getSubject(id)
      .then(subject => this.subject = subject);
  }
  goBack(){
    window.history.back()
  }
}
