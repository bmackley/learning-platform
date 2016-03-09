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
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.elementRef.nativeElement]);
                MathJax.Hub.Queue(() => {
                    this.mathRendered.next();
                });
            });
        }
    }
}
