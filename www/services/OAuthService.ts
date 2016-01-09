import {Injectable} from 'angular2/core';

@Injectable()
export class OAuthService {
    constructor() {
        OAuth.initialize('TSIO2Yu3hIlm1_DPW5BpnybvigE');
        OAuth.redirect('github', 'http://localhost:8080/view-problem/lastmj/sm-problem-1');
    }
}
