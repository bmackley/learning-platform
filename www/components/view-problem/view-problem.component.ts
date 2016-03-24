import {Component, Inject, OnDestroy, OnInit, Injector, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {ProblemTextComponent} from '../problem-text/problem-text.component.ts';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {API} from '../../services/api.service.ts';

@Component({
	selector: 'view-problem',
	template: `
        <a [routerLink]="['EditExistingProblem', { 'problem-id': problemId }]">Edit Problem</a>

        <div class="sm-flex-row sm-flex-center sm-problem-container">
            <div class="sm-flex-col">
                <div id="problemTextContainer"></div>
                <input #defaultAnswerInput type="text" placeholder="type answer" class="sm-answer-input" [hidden]="!userInputs || userInputs.length > 0">
                <button class="sm-check-answer-button" (click)="checkAnswer(defaultAnswerInput.value)">Check</button>
                <div class="sm-flex-row" style="margin-top: 25px">
                    <button (click)="loadPrevProblem()">Prev</button>
                    <button (click)="loadNextProblem(answerInput)" style="margin-left: auto">Next</button>
                </div>
            </div>
        </div>

        <style>
            @import 'www/components/app/app.css';

            .sm-problem-container {
                margin-top: 10vh;
                margin-left: 5vw;
                margin-right: 5vw;
            }

            .sm-problem-text {
                font-size: 25px;
                font-family: Ubuntu, sans-serif;
            }

            .sm-answer-input {
                padding: 10px;
                outline: none;
                font-size: 25px;
                border: none;
                border-bottom: 1px solid grey;
            }

            .sm-check-answer-button {
                margin-top: 10px;
                margin-left: auto;
                border: none;
                background-color: white;
                box-shadow: 0px 0px 1px grey;
                font-size: 25px;
                padding: 10px;
                color: grey;
                outline: none;
                cursor: pointer;
                transition: background-color .2s ease-in-out;
            }

            .sm-check-answer-button:active {
                background-color: rgba(0, 0, 0, .1);
            }
        </style>
    `,
    directives: [ProblemTextComponent, ROUTER_DIRECTIVES]
})

export class ViewProblemComponent implements OnDestroy, OnInit {

	public text: string;
	public code: string;
    public answer;
    public userInputs;

    private store;
    private unsubscribe;
    private problemId;
    private injector;
    private dcl;
    private elementRef;

	constructor(@Inject(Constants.REDUX_STORE) store, routeParams: RouteParams, injector: Injector, dcl: DynamicComponentLoader, elementRef: ElementRef) {
        this.store = store;
        this.injector = injector;
        this.dcl = dcl;
        this.elementRef = elementRef;
        const username = routeParams.get('username');
        this.problemId = routeParams.get('problem-id');

        this.unsubscribe = store.subscribe(this.mapStateToThis(store));
	}

    checkAnswer(defaultAnswerInputValue) {

        if (typeof this.answer !== 'object') {
            if (this.answer.toString().toLowerCase() === defaultAnswerInputValue.toLowerCase()) {
                API.answerAttempt(this.problemId, true, this.text, this.answer, defaultAnswerInputValue);
            }
            else {
                API.answerAttempt(this.problemId, false, this.text, this.answer, defaultAnswerInputValue);
            }
        }
        else {
            const userAnswers = {};
            const correct = this.userInputs.reduce((prev, curr) => {
                const userInputElement = document.getElementById(curr);
                const userAnswer = userInputElement.textContent;

                userAnswers[curr] = userAnswer;

                if (this.answer[curr].toString().toLowerCase() === userAnswer.toLowerCase()) {
                    return prev;
                }
                else {
                    return false;
                }
            }, true);

            if (correct) {
                API.answerAttempt(this.problemId, true, this.text, this.answer, userAnswers);
            }
            else {
                API.answerAttempt(this.problemId, false, this.text, this.answer, userAnswers);
            }
        }


    }

    loadPrevProblem() {
        alert('not implemented');
    }

    async loadNextProblem(answerInput) {
        try {
            answerInput && (answerInput.value = ''); //TODO horrible!!! Interacting with the DOM directly, find a better way to do this

            await Actions.getViewProblem.execute(this.store, this.problemId);

            const problemTextComponent = this.injector.get(Constants.PROBLEM_TEXT_COMPONENT);
            const ref = await this.dcl.loadAsRoot(problemTextComponent, '#problemTextContainer', this.injector);
            ref.instance.text = this.text;

            //TODO strange hack to get ngOnInit or change detection to work with the component loading with loadAsRoot. See here: https://github.com/angular/angular/issues/6748
            ref.location.internalElement.parentView.changeDetector.ref.detectChanges();
        }
        catch(error) {
            console.log(error);
        }
    }

    mapStateToThis(store) {
        return () => {
            const state = store.getState();

            this.text = state.currentViewProblem.text;
            this.answer = state.currentViewProblem.answer;
            this.userInputs = state.currentViewProblem.userInputs;
        };
    }

    ngOnInit() {
        this.loadNextProblem();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

}
