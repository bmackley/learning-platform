import {Directive, ElementRef, OnChanges, Input} from 'angular2/core';

@Directive({
    selector: '[smMathjax]'
})

export class MathjaxDirective implements OnChanges {

    @Input() text: string;

    private elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnChanges() {
        if (this.text) {
            console.log(this.text);
            alert('about to update math');
            MathJax.Hub.Update();
            alert('math update dispatched or complete');
        }
    }
}
