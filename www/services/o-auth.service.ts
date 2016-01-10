import {Injectable} from 'angular2/core';
import {Location} from 'angular2/router';

@Injectable()
export class OAuthService {

    public token: String;

    constructor(location: Location) {
        OAuth.initialize('TSIO2Yu3hIlm1_DPW5BpnybvigE');
    }

    authenticate(partialPath: String, username: String, problemId: String) {

        if (!window.localStorage.getItem('REDIRECT_PERFORMED')) {
            window.localStorage.setItem('REDIRECT_PERFORMED', 'HAS_A_VALUE');
            OAuth.redirect('github', `http://localhost:8080/www/#/${partialPath}/${username}/${problemId}`);
            return;
        }

        window.localStorage.removeItem('REDIRECT_PERFORMED');
        this.executeCallback();
    }

    private executeCallback() {
        OAuth.callback('github').done((result) => {
            this.token = result.access_token;
		})
		.fail(function(err) {

		});
    }
}
