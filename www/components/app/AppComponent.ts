import {Component} from 'angular2/core';
import {OAuthService} from '../../services/OAuthService.ts';

@Component({
	selector: 'app',
	templateUrl: 'components/app/app.html',
	providers: [OAuthService]
})

export class AppComponent {

	constructor(oAuthService: OAuthService) {

	}

}
