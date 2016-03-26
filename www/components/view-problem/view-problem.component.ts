import {Component, Inject, OnDestroy, OnInit, Injector, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {ProblemTextComponent} from '../problem-text/problem-text.component.ts';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {API} from '../../services/api.service.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

@Component({
	selector: 'view-problem',
	template: `
        <a [routerLink]="['EditExistingProblem', { 'problem-id': problemId }]" [hidden]="!currentUser || currentUser.uid !== problemUid">Edit Problem</a>

        <div class="sm-flex-row sm-flex-center sm-problem-container">
            <div class="sm-flex-col">
                <div id="problemTextContainer"></div>

                <div class="sm-flex-col">
                    <input #defaultAnswerInput type="text" placeholder="type answer" class="sm-answer-input" [hidden]="!userInputs || userInputs.length > 0 || !userCheckboxes || userCheckboxes.length > 0 || !userRadios || userRadios.length > 0">
                    <button class="sm-check-answer-button sm-problem-button" (click)="checkAnswer(defaultAnswerInput.value)">Check</button>
                    <div class="sm-flex-row" style="margin-top: 25px;">
                        <button (click)="loadPrevProblem()" class="sm-problem-button">Prev</button>
                        <button (click)="loadNextProblem(defaultAnswerInput)" class="sm-problem-button" style="margin-left: auto">Next</button>
                    </div>
                </div>

            </div>
        </div>

        <style>
            @import 'www/components/app/app.css';

            .sm-problem-container {
                margin-top: 10vh;
                margin-bottom: 10vh;
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
                transition: background-color .2s ease-in-out;
            }

            .sm-problem-button {
                border: none;
                background-color: white;
                box-shadow: 0px 0px 1px grey;
                font-size: 25px;
                padding: 10px;
                color: grey;
                outline: none;
                cursor: pointer;
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
    public userCheckboxes;
    public userRadios;
    public problemUid;
    public currentUser;

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

        //TODO put this in an action of its own
        const authData = FirebaseService.isUserLoggedIn();

        if (authData) {
            Actions.setCurrentUser.execute(store, authData.uid, authData.password.email);
        }
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
            const inputsCorrect = this.userInputs.reduce((prev, curr) => {
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

            const checkboxesCorrect = this.userCheckboxes.reduce((prev, curr) => {
                const userCheckboxElement = document.getElementById(curr);
                const userAnswer = userCheckboxElement.checked;

                userAnswers[curr] = userAnswer;

                if (this.answer[curr] === userAnswer) {
                    return prev;
                }
                else {
                    return false;
                }
            }, true);

            const radiosCorrect = this.userRadios.reduce((prev, curr) => {
                const userRadioElement = document.getElementById(curr);
                const userAnswer = userRadioElement.checked;

                userAnswers[curr] = userAnswer;

                if (this.answer[curr] === userAnswer) {
                    return prev;
                }
                else {
                    return false;
                }
            }, true);

            if (inputsCorrect && checkboxesCorrect && radiosCorrect) {
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

            this.problemUid = state.currentViewProblem.uid;
            this.text = state.currentViewProblem.text;
            this.answer = state.currentViewProblem.answer;
            this.userInputs = state.currentViewProblem.userInputs;
            this.userCheckboxes = state.currentViewProblem.userCheckboxes;
            this.userRadios = state.currentViewProblem.userRadios;
            this.currentUser = state.currentUser;
        };
    }

    ngOnInit() {
        this.loadNextProblem();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

}
