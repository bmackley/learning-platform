import {Component, Inject, Input} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';

@Component({
	selector: 'sm-code-mirror',
	template: `
        <textarea #codeTextArea type="text" (keyup)="textChanged(codeTextArea.value)" style="height: 500px; width: 500px" placeholder="Enter code here" [innerHTML]="originalCode || ''"></textarea>
    `
})

export class CodeMirrorComponent {

    @Input() originalCode;

    private store;

	constructor(@Inject(Constants.REDUX_STORE) store) {
        this.store = store;
	}

    textChanged(value) {
        Actions.setEditProblemCode.execute(this.store, value);
    }
}
