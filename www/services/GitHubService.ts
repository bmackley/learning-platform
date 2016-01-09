import {Injectable, Inject} from 'angular2/core';
import {Problem} from '../interfaces/ProblemInterface.ts';
import {OAuthService} from './OAuthService.ts';

@Injectable()
export class GitHubService {

    private authorizedGitHub;
    private unauthorizedGitHub;

    constructor(@Inject(OAuthService) oAuthService: OAuthService) {

        if (oAuthService.token) {
            this.authorizedGitHub = new Github({
               token: OAuthService.token,
               auth: 'oauth'
           });
        }

        this.unauthorizedGitHub = new Github({});
    }

    //TODO update this code to use repo.read instead of contents, repo.read seems like a simpler api
    getProblem(username: String, problemId: String) {
        return new Promise((resolve, reject) => {

            const gitHub = this.authorizedGitHub || this.unauthorizedGitHub;

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

    //TODO refactor this, I'm creating repos and github objects a lot, not very functional perhaps either
    async saveProblem(username: String, problemId: String, text: String, code: String) {

        const gitHub = this.authorizedGitHub || this.unauthorizedGitHub;

        if (!(await this.checkIfRepoExists(username, problemId, gitHub))) {
            try {
                await this.createRepo(problemId, gitHub);
            }
            catch(error) {
                throw new Error(error);
            }
        }

        const repo = gitHub.getRepo(username, problemId);

        try {
            await this.updateFile('text.txt', text, repo);
            await this.updateFile('code.js', code, repo);
        }
        catch(error) {
            throw new Error(error);
        }
    }

    private checkIfRepoExists(username: String, problemId: String, gitHub) {
        return new Promise(function(resolve, reject) {

            const repo = gitHub.getRepo(username, problemId);

            repo.show(function(err, repo) {
                if (err) {
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    private createRepo(problemId: String, gitHub) {
        return new Promise(function(resolve, reject) {

            const user = gitHub.getUser();

            user.createRepo({'name': problemId}, function(err, res) {
                if (err) {
                    reject();
                }

                resolve();
            });
        });
    }

    private updateFile(path: String, content: String, repo) {
        return new Promise(function(resolve, reject) {
            repo.write('master', path, content, 'making changes', {}, function(err) {
                if (err) {
                    reject();
                }
                resolve();
            })
        });
    }
}
