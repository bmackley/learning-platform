import {Component, OnInit} from 'angular2/core';
import {Concept} from './concept.ts';
import {ConceptDetailComponent} from './concept-detail.component.ts';
import {ConceptService} from '../../services/concept.service.ts';
import {Router } from 'angular2/router';
@Component({
  selector: 'my-concepts',
  templateUrl: 'components/concept/concepts.component.html',
  directives: [ConceptDetailComponent]
})
export class ConceptsComponent implements OnInit {
  // public title = 'Tour of Subjectes';
  public concepts: Concept[];
  public selectedConcept: Concept;
  constructor(private _router: Router, private _conceptService: ConceptService) { }
  getConcepts() {
    this._conceptService.getConcepts().then(concepts => this.concepts = concepts);
  }
  ngOnInit() {
    this.getConcepts();
  }
  onSelect(concept: Concept) { this.selectedConcept = concept; }
  gotoDetail() {
    this._router.navigate(['ConceptDetail', { id: this.selectedConcept.id }]);
  }
  gotoCreateConcepts() {

  }
  gotoQuestions() {
    this._router.navigate(['Questions']);
  }
}
