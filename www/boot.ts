import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component.ts';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';
import {FirebaseService} from './services/firebase.service.ts';
import {ProblemService} from './services/problem.service.ts';

bootstrap(AppComponent, [FirebaseService, ProblemService, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
