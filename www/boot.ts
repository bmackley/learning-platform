import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component.ts';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';
import {createStore} from 'redux';
import {rootReducer} from './redux/reducers.ts';
import {Constants} from './services/constants.service.ts';

const store = createStore(rootReducer);

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(Constants.REDUX_STORE, {useValue: store})]);
