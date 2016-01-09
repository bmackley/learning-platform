import {Injectable} from 'angular2/core';
import {Problem} from '../interfaces/ProblemInterface.ts';

@Injectable()
export class GitHubService {

    constructor() {



    }

    getProblem(username: String, problemId: String) {
        return new Promise(function(resolve, reject) {
            const gitHub = new Github({});

            const repo = gitHub.getRepo('lastmj', 'sm-problem-1');

            repo.contents('master', 'text.txt', function(err, textContents) {
                const text = atob(textContents.content);

                repo.contents('master', 'code.js', function(err, codeContents) {
                    const code = atob(codeContents.content);

                    console.log(text);
                    console.log(code);

                    resolve({
                        text: text,
                        code: code
                    });
                });
            });
        });
    }
}
