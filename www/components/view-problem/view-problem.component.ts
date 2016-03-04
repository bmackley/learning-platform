import {Component} from 'angular2/core';
import {Problem} from '../../interfaces/problem.interface.ts';
import {RouteParams} from 'angular2/router';
import {ProblemService} from '../../services/problem.service.ts';

@Component({
	selector: 'view-problem',
	template: `
        <div class="sm-flex-row sm-flex-center sm-problem-container">
            <div class="sm-flex-col">
                <div class="sm-problem-text">{{text}}</div>
                <input type="text" placeholder="type answer" class="sm-answer-input">
                <button class="sm-check-answer-button">Check</button>
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
    `
})

export class ViewProblemComponent {

	public text: string;
	public code: string;

    private problemService;

	constructor(routeParams: RouteParams, problemService: ProblemService) {
        this.problemService = problemService;

		this.getProblem(routeParams.get('username'), routeParams.get('problem-id'));
	}

	private async getProblem(username: String, problemId: String) {

		const problem = await this.problemService.getById(problemId, username);

		this.text = problem.text;
		this.code = problem.code;
	}

}
