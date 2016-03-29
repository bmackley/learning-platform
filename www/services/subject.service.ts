import {Subjects} from './mock-subjects';
import {Injectable} from 'angular2/core';

@Injectable()
export class SubjectService {
  getSubjects() {
    return Promise.resolve(Subjects);
  }
  getSubject(id: number) {
    return Promise.resolve(Subjects).then(
      subjects => subjects.filter(subject => subject.id === id)[0]
    );
  }
}
