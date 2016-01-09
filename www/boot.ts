import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app/AppComponent.ts';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
