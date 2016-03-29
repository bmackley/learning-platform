import {Component, OnInit} from 'angular2/core';
import {Subject} from './subject';
import {SubjectDetailComponent} from './subject-detail.component';
import {SubjectService} from './subject.service';
import {Concept} from '../concept/concept';
import {ConceptDetailComponent} from '../concept/concept-detail.component';
import {ConceptService} from '../concept/concept.service'
import {Router } from 'angular2/router';

@Component({
  selector: 'my-subjects',
  templateUrl: 'app/subject/subjects.component.html',
  directives: [SubjectDetailComponent]
})
export class SubjectsComponent implements OnInit {
  // public title = 'Tour of Subjectes';
  public subjects: Subject[];
  public selectedSubject: Subject;
  public concepts: Concept[];
  constructor(private _router: Router, private _subjectService: SubjectService) { }
  getSubjects() {
    this._subjectService.getSubjects().then(subjects => this.subjects = subjects);
  }
  ngOnInit() {
    this.getSubjects();
  }
  onSelect(subject: Subject) { this.selectedSubject = subject; }
  gotoDetail() {
    this._router.navigate(['Concepts', { id: this.selectedSubject.id }]);
  }
}
