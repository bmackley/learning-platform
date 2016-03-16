import {Component, Inject, OnDestroy, OnInit, Injector, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ProblemTextComponent} from '../problem-text/problem-text.component.ts';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {API} from '../../services/api.service.ts';

@Component({
	selector: 'view-problem',
	template: `
        <div class="sm-flex-row sm-flex-center sm-problem-container">
            <div class="sm-flex-col">
                <div id="problemTextContainer"></div>
                <input #answerInput type="text" placeholder="type answer" class="sm-answer-input">
                <button class="sm-check-answer-button" (click)="checkAnswer(answerInput.value)">Check</button>
                <div class="sm-flex-row" style="margin-top: 25px">
                    <button (click)="loadPrevProblem()">Prev</button>
                    <button (click)="loadNextProblem()" style="margin-left: auto">Next</button>
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
    directives: [ProblemTextComponent]
})

export class ViewProblemComponent implements OnDestroy, OnInit {

	public text: string;
	public code: string;
    public answer;

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

    checkAnswer(studentAnswer) {
        if (this.answer.toLowerCase() === studentAnswer.toLowerCase()) {
            console.log('API.correctAttempt');
            API.correctAttempt(this.problemId);
        }
        else {
            console.log('API.incorrectAttempt');
            API.incorrectAttempt(this.problemId);
        }
    }

    loadPrevProblem() {
        alert('not implemented');
    }

    async loadNextProblem() {
        try {
            await Actions.setProblem.execute(this.store, this.problemId);

            const problemTextComponent = this.injector.get(Constants.PROBLEM_TEXT_COMPONENT);
            const ref = await this.dcl.loadAsRoot(problemTextComponent, '#problemTextContainer', this.injector);
            ref.instance.text = {
                value: this.text
            };

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

            this.text = state.currentProblem.text;
            this.answer = state.currentProblem.answer;
        };
    }

    ngOnInit() {
        this.loadNextProblem();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

}
