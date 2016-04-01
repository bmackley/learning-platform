import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

@Component({
	selector: 'sm-signup',
	template: `
        <div>Sign Up</div>
        <input #emailInput type="email" placeholder="email">
        <input #passwordInput1 type="password" placeholder="password">
        <input #passwordInput2 type="password" placeholder="password">
        <button (click)="signUp(emailInput.value, passwordInput1.value, passwordInput2.value)">Sign Up</button>
				<div id="modal1" class="modal bottom-sheet">
				<div id="CreateUserSuccess" class="modal">
			    <div class="modal-content">
			      <h4>Modal Header</h4>
			      <p>A bunch of text</p>
			    </div>
			    <div class="modal-footer">
			      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Login</a>
						<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
			    </div>
			  </div>
				<button data-target="modal1" class="btn modal-trigger">Modal</button>
    `
})

export class SignupComponent {

	constructor(@Inject(Constants.REDUX_STORE) store) {

	}

    async signUp(email, password1, password2) {
        //TODO I MAY want to look into Angular 2 form validation for this stuff...it would probably be easier and clearn, but then again,
        //I want to stay away from Angular specific code as much as possible to future-proof the app. Eventually, I think I want to move this app to web components
        if (!email) {
            alert('Must enter email address');
            return;
        }

        if (!password1 || !password2) {
            alert('Password fields must not be left blank');
            return;
        }

        if (password1 !== password2) {
            alert('Passwords must match');
            return;
        }

        try {
            const userData = await FirebaseService.createUser(email, password1);
            alert('user created successfully, uid: ' + userData.uid);
        }
        catch(error) {
            alert(error);
        }
    }
}
