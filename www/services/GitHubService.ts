import {Injectable} from 'angular2/core';
import {Problem} from '../interfaces/ProblemInterface.ts';

@Injectable()
export class GitHubService {

    constructor() {



    }

    //TODO update this code to use repo.read instead of contents, repo.read seems like a simpler api
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

    //TODO refactor this, I'm creating repos and github objects a lot, not very functional perhaps either
    async saveProblem(token: String, username: String, problemId: String, text: String, code: String) {

        if (!(await this.checkIfRepoExists(username, problemId))) {
            try {
                await this.createRepo(token, problemId);
            }
            catch(error) {
                throw new Error(error);
            }
        }

        const gitHub = new Github({
            token: token,
            auth: 'oauth'
        });

        const repo = gitHub.getRepo(username, problemId);

        try {
            await this.updateFile('text.txt', text, repo);
            await this.updateFile('code.js', code, repo);
        }
        catch(error) {
            throw new Error(error);
        }
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
