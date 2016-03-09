import {Directive, ElementRef, OnChanges, Input, Output, EventEmitter} from 'angular2/core';

@Directive({
    selector: '[smMathjax]'
})

export class MathjaxDirective implements OnChanges {

    @Input() text: string;
    @Output() mathRendered;

    private elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;

        this.mathRendered = new EventEmitter();
    }

    ngOnChanges() {
        if (this.text) {
            setTimeout(() => {
                //TODO This is all wrong. The order of events is not gauranteed, depending on the way I do it there are large delays: http://docs.mathjax.org/en/latest/advanced/typeset.html
                MathJax.Hub.Typeset(this.elementRef.nativeElement);
                this.mathRendered.next();
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
}
