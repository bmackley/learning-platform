import {Component, Input, DoCheck, ChangeDetectorRef} from 'angular2/core';
import {SpinnerComponent} from '../spinner/spinner.component.ts';

@Component({
	selector: 'sm-problem-text',
	template: `
        <div class="sm-problem-text" [hidden]="hideText" [innerHTML]="text"></div>

        <!--<div class="sm-flex-row sm-flex-center" [hidden]="!hideText">
            <sm-spinner></sm-spinner>
        </div>-->

        <style>
            @import 'www/components/app/app.css';

            .sm-problem-text {
                font-size: 25px;
                font-family: Ubuntu, sans-serif;
            }
        </style>
    `,
    directives: [SpinnerComponent]
})

export class ProblemTextComponent {

	@Input() text;

    public hideText;

    private changeDetector;

	constructor(changeDetector: ChangeDetectorRef) {
        this.hideText = true;

        this.changeDetector = changeDetector;
	}

    ngOnInit() {
        setTimeout(() => {
            MathJax.Hub.Typeset();
            this.hideText = false;
            this.changeDetector.detectChanges();
            //TODO this component has serious problems with change detection. It seems that because it is instantiated with loadAsRoot, change detection must be run manually. See here: See here: https://github.com/angular/angular/issues/6748

            // MathJax.Hub.Queue(() => {
            //     MathJax.Hub.Typeset(null, () => {
            //         this.hideText = false;
            //         this.changeDetector.detectChanges();
            //     });
            // });
        });
    }
}
