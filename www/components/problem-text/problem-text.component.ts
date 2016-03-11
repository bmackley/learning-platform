import {Component, Input} from 'angular2/core';
import {MathjaxDirective} from '../../directives/mathjax.directive.ts';
import {SpinnerComponent} from '../spinner/spinner.component.ts';

@Component({
	selector: 'sm-problem-text',
	template: `
        <div class="sm-problem-text" smMathjax [text]="text" [hidden]="hideText" (mathRendered)="setHideText()">{{text}}</div>

        <div class="sm-flex-row sm-flex-center">
            <sm-spinner [hidden]="!hideText"></sm-spinner>
        </div>

        <style>
            @import 'www/components/app/app.css';

            .sm-problem-text {
                font-size: 25px;
                font-family: Ubuntu, sans-serif;
            }
        </style>
    `,
    directives: [MathjaxDirective, SpinnerComponent]
})

export class ProblemTextComponent {

	@Input() text: string;

    public hideText: boolean;

	constructor() {
        this.hideText = true;
	}

    setHideText() {
        this.hideText = false;
    }

    ngOnChanges() {
        console.log('problem-text.component');
        console.log(this.text);
    }

}
