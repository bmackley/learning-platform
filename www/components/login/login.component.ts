import {Component, Inject} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

@Component({
	selector: 'sm-login',
	templateUrl: './login.component.html' 
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
