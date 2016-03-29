import {Concepts} from './mock-concepts.ts';
import {Injectable} from 'angular2/core';

@Injectable()
export class ConceptService {
  getConcepts() {
    return Promise.resolve(Concepts);
  }
  getConcept(id: number) {
    return Promise.resolve(Concepts).then(
      concepts => concepts.filter(subject => subject.id === id)[0]
    );
  }
}
