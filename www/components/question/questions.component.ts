import {Component, OnInit} from 'angular2/core';
import {ConceptService} from '../../services/concept.service.ts';
import {Router } from 'angular2/router';

@Component({
  selector: 'my-concepts',
  templateUrl: 'components/question/questions.component.html',
})
export class QuestionsComponent implements OnInit {
  // public title = 'Tour of Subjectes';
  constructor(private _router: Router) { }
  getQuestions() {
    //blank for the moment
    //this._conceptService.getConcepts().then(concepts => this.concepts = concepts);
  }
  ngOnInit() {
    //this.getConcepts();
  }
  //onSelect(concept: Concept) { this.selectedConcept = concept; }
  gotoDetail() {
    //this._router.navigate(['ConceptDetail', { id: this.selectedConcept.id }]);
  }
  gotoCreateQuestion() {

  }
}
