import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component.ts';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';
import {OAuthService} from './services/o-auth.service.ts';

bootstrap(AppComponent, [OAuthService, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
