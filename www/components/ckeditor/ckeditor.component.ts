import {Component, Inject, Input} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';

@Component({
	selector: 'sm-ckeditor',
	template: `
        <textarea #textTextArea type="text" (keyup)="textChanged(textTextArea.value)" style="height: 250px; width: 100%" placeholder="Enter text here" [innerHTML]="originalText || ''"></textarea>
    `
})

export class CkeditorComponent {

    @Input() originalText;

    private store;

	constructor(@Inject(Constants.REDUX_STORE) store) {
        this.store = store;
	}

    textChanged(value) {
        Actions.setEditProblemText.execute(this.store, value);
    }
}
