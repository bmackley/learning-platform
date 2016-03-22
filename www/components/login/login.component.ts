import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

@Component({
	selector: 'sm-login',
	template: `
        <div>Log In</div>
        <input #emailInput type="email" placeholder="email">
        <input #passwordInput type="password" placeholder="password">
        <button (click)="logIn(emailInput.value, passwordInput.value)">Log In</button>
        <button (click)="logOut()">Log Out</button>
    `
})

export class LoginComponent {

	constructor(@Inject(Constants.REDUX_STORE) store) {

	}

    async logIn(email, password) {
        try {
            const authData = await FirebaseService.logInUser(email, password);
            alert('user logged in successfully, uid: ' + authData.uid);
        }
        catch(error) {
            alert(error);
        }
    }

    logOut() {
        FirebaseService.logOutUser();
    }
}
