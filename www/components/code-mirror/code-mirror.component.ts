import {Component} from 'angular2/core';

@Component({
	selector: 'sm-code-mirror',
	template: `
        <input #textInput type="text" (change)="textChanged(textInput.value)">
    `
})

export class CodeMirrorComponent {
	constructor() {
	}

    textChanged(value) {
        
    }
}
