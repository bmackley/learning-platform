import {Component, Input, DoCheck} from 'angular2/core';
import {SpinnerComponent} from '../spinner/spinner.component.ts';

@Component({
	selector: 'sm-problem-text',
	template: `
        <div class="sm-problem-text" (mathRendered)="setHideText()">{{text.value}}</div>

        <!--<div class="sm-flex-row sm-flex-center">
            <sm-spinner [hidden]="!hideText"></sm-spinner>
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

    public hideText: boolean;
    public renderMath;

	constructor() {
        this.hideText = true;

        this.renderMath = () => {};
	}

    setHideText() {
        console.log('setHidetext');
        this.hideText = false;
        console.log(this.hideText);
    }

    ngOnInit() {
        setTimeout(() => {
            MathJax.Hub.Typeset();
            this.hideText = false;
            // console.log('rendering math');
            // MathJax.Hub.Typeset(this.elementRef.nativeElement);
            // this.mathRendered.next();
            //TODO This is all wrong. The order of events is not gauranteed, depending on the way I do it there are large delays: http://docs.mathjax.org/en/latest/advanced/typeset.html
            //MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.elementRef.nativeElement]);
            // MathJax.Hub.Queue(() => {
            //     this.mathRendered.next();
            // });
            // MathJax.Hub.Queue(() => {
            //     MathJax.Hub.Typeset(this.elementRef.nativeElement, () => {
            //         this.mathRendered.next();
            //     });
            // });
        });
    }
}
