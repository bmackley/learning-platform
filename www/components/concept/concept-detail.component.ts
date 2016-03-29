import {Component, OnInit} from 'angular2/core';
import {Concept} from './concept';
import {RouteParams} from 'angular2/router';
import { ConceptService } from './concept.service';

@Component({
  selector: 'my-concept-detail',
  template: `
  <my-concept-detail [concept]="selectedConcept"></my-concept-detail>
  <div *ngIf="subject">
    <h2>{{concept.name}} details!</h2>
    <div><label>id: </label>{{concept.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="concept.name" placeholder="name"/>
    </div>
  </div>
  <p>Hello</p>
  <button (click)="goBack()">Back</button>
  `,
  inputs: ['subject']
})
export class ConceptDetailComponent {
  public concept: Concept;
  constructor(
    private _conceptService: ConceptService,
    private _routeParams: RouteParams) {
  }
  ngOnInit() {
    //the + here converts the string passed by the url into a number
    let id = +this._routeParams.get('id');
    this._conceptService.getConcept(id)
      .then(concept => this.concept = concept);
  }
  goBack(){
    window.history.back()
  }
}
