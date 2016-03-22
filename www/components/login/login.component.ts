import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';

@Component({
	selector: 'sm-login',
	template: `
        <div>Log In</div>
        <input #emailInput type="text" placeholder="email">
        <input #passwordInput type="text" placeholder="password">
    `
})

export class LoginComponent {

	constructor(@Inject(Constants.REDUX_STORE) store) {

	}
}
