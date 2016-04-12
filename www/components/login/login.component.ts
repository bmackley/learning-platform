import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';
import {Router } from 'angular2/router';

@Component({
	selector: 'sm-login',
	template: `

	<div class="section">
	  <div class="container">
			<div class="row">
				<div class="col s12 m6 offset-l4 l4">
					<div class="card grey lighten-4" align="center">
						<div class="card-content light-blue-text text-darken-4">
							<span class="card-title">Log In</span>
							<form>
							<div class="input-field col s12">
			          <input id="email" #emailInput type="text" class="validate">
			          <label for="email">Email</label>
			        </div>
							<div class="input-field col s12 m12 l12">
			          <input id="password" #passwordInput type="password" class="validate">
			          <label for="password">Password</label>
			        </div>
							<a (click)="logIn(emailInput.value, passwordInput.value)" class="waves-effect waves-light btn">Log In</a>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`
})

export class LoginComponent {

    private store;

	constructor(private _router: Router, @Inject(Constants.REDUX_STORE) store) {
        this.store = store;
	}

    async logIn(email, password) {
        try {
            //TODO put this in an action of its own
            const authData = await FirebaseService.logInUser(email, password);
            Actions.setCurrentUser.execute(this.store, authData.uid, email);
						this._router.navigate(['Subjects'])
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
