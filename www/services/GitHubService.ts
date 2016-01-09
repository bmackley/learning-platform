import {Injectable} from 'angular2/core';
import {Problem} from '../interfaces/ProblemInterface.ts';

@Injectable()
export class GitHubService {

    constructor() {



    }

    getProblem(username: String, problemId: String) {
        return new Promise(function(resolve, reject) {
            const gitHub = new Github({});

            const repo = gitHub.getRepo(username, problemId);

            repo.contents('master', 'text.txt', function(err, textContents) {
                const text = atob(textContents.content);

                repo.contents('master', 'code.js', function(err, codeContents) {
                    const code = atob(codeContents.content);

                    resolve({
                        text: text,
                        code: code
                    });
                });
            });
        });
    }

    async saveProblem(token: String, username: String, problemId: String, text: String, code: String) {

        if (!(await this.checkIfRepoExists(username, problemId))) {
            try {
                await this.createRepo(token, problemId);
            }
            catch(error) {
                throw new Error(error);
            }
        }

        console.log('repo created');
    }

    private checkIfRepoExists(username: String, problemId: String) {
        return new Promise(function(resolve, reject) {
            const gitHub = new Github({});

            const repo = gitHub.getRepo(username, problemId);

            repo.show(function(err, repo) {
                if (err) {
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    private createRepo(token: String, problemId: String) {
        return new Promise(function(resolve, reject) {
            const gitHub = new Github({
                token: token,
                auth: 'oauth'
            });

            const user = gitHub.getUser();

            user.createRepo({'name': problemId}, function(err, res) {
                if (err) {
                    reject();
                }

                resolve();
            });
        });
    }

    private updateFile() {

    }
}
