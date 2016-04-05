import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

@Component({
	selector: 'sm-login',
	template: `

	<div class="row" style="align: center">
			<div class="col s12 m6 l4">
					<div class="card grey lighten-4" align="center">
						<div class="card-content light-blue-text text-darken-4">
							<span class="card-title">Log In</span>
							<input #emailInput type="email" placeholder="email">
							<input #passwordInput type="password" placeholder="password">
							<button class="waves-effect waves-light btn (click)="logIn(emailInput.value, passwordInput.value)">Log In</button>
							<button  class="waves-effect waves-light btn (click)="logOut()">Log Out</button>
						</div>
					</div>
				</div>
			</div>

`
})

export class LoginComponent {

    private store;

	constructor(@Inject(Constants.REDUX_STORE) store) {
        this.store = store;
	}

    async logIn(email, password) {
        try {
            //TODO put this in an action of its own
            const authData = await FirebaseService.logInUser(email, password);
            Actions.setCurrentUser.execute(this.store, authData.uid, email);
            alert('user logged in successfully, uid: ' + authData.uid);
        }
        catch(error) {
            alert(error);
        }
    }

    logOut() {
        FirebaseService.logOutUser();
        alert('user logged out successfully');
    }
}
