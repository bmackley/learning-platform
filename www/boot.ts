import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component.ts';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';
import {createStore} from 'redux';
import {rootReducer} from './redux/reducers.ts';
import {Constants} from './services/constants.service.ts';
import {ProblemTextComponent} from './components/problem-text/problem-text.component.ts';

const store = createStore(rootReducer);

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(Constants.REDUX_STORE, {useValue: store}), provide(Constants.PROBLEM_TEXT_COMPONENT, {useValue: ProblemTextComponent})]);
