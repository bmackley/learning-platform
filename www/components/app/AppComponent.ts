import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
	selector: 'app',
	templateUrl: 'components/app/app.html'
})

export class AppComponent {

	constructor(http: Http) {

		const myClientId = '3821f5e0d3ff4dcd466a';

		http
			.get('https://github.com/login/oauth/authorize?client_id=myClientId')
			.map(res => res.json())
			.subscribe()
	}

}
