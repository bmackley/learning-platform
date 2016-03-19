import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';

@Component({
	selector: 'sm-ckeditor',
	template: `
        <textarea #textTextArea type="text" (keyup)="textChanged(textTextArea.value)" style="height: 500px; width: 500px" placeholder="Enter text here"></textarea>
    `
})

export class CkeditorComponent {

    private store;

	constructor(@Inject(Constants.REDUX_STORE) store) {
        this.store = store;
	}

    textChanged(value) {
        Actions.setEditProblemText.execute(this.store, value);
    }
}
