import {Component} from 'angular2/core';
import {Problem} from '../../interfaces/problem.interface.ts';
import {RouteParams} from 'angular2/router';

@Component({
	selector: 'view-problem',
	template: `
        <div class="sm-flex-row sm-flex-center sm-problem-container">
            <div class="sm-flex-col">
                <div>{{text}}</div>
                <input type="text" placeholder="type answer" class="sm-answer-input">
            </div>
        </div>

        <style>
            @import 'www/components/app/app.css';

            .sm-problem-container {
                height: 100vh;
                margin-left: 5vw;
                margin-right: 5vw;
            }

            .sm-answer-input {
                padding: 10px;
                outline: none;
                font-size: 25px;
                border: none;
                border-bottom: 1px solid grey;
            }
        </style>
    `
})

export class ViewProblemComponent {

	public text: string;
	public code: string;

	constructor(routeParams: RouteParams) {
        this.text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie ligula sed sem hendrerit, vitae dignissim urna finibus. Nulla vitae rhoncus turpis. Sed viverra dapibus quam, mattis feugiat est porttitor et. Pellentesque sed metus fringilla augue sodales vestibulum. Vestibulum lorem elit, volutpat ut nisi a, fermentum imperdiet elit. Nam sed accumsan nunc. Suspendisse mauris nisl, semper sed facilisis auctor, sagittis et ligula.

Curabitur scelerisque, risus non euismod malesuada, tellus elit accumsan est, a ornare lacus magna nec nisl. Nullam vel facilisis dui. In tristique volutpat tempus. Vestibulum accumsan diam sagittis ligula viverra commodo. Praesent pharetra lectus quis scelerisque posuere. Nunc id nunc iaculis orci hendrerit interdum. Curabitur hendrerit felis consectetur risus accumsan dignissim. Sed sapien leo, venenatis eget tempus sed, scelerisque a nisl. Suspendisse commodo malesuada est, non fringilla nisi pellentesque in. Proin eu mauris eros. Donec luctus suscipit venenatis. Quisque nibh eros, rutrum sit amet nulla quis, pellentesque accumsan turpis. Mauris vestibulum elit at porttitor dapibus. Pellentesque urna ex, dignissim id dui vel, commodo feugiat purus. Sed eu vulputate diam. Fusce ut felis mi.

Donec at turpis non augue sollicitudin lacinia at vitae sapien. Mauris posuere pretium pharetra. Donec quis lorem ut mi accumsan pretium ac posuere diam. Vivamus egestas tellus eu posuere vestibulum. Duis id lectus sit amet libero fringilla condimentum. Nam fermentum est in nisi euismod lobortis. Proin gravida tincidunt ex, ut pharetra dui elementum et. Mauris rutrum massa ac ipsum interdum, in suscipit odio accumsan. Donec nec placerat diam. Etiam imperdiet nibh id sollicitudin dictum.

Vivamus consectetur a nisi sit amet aliquet. Nunc ultricies tortor eu tellus accumsan egestas. Ut porta condimentum leo in finibus. Donec mattis sapien eget iaculis auctor. Pellentesque ut fringilla neque, in malesuada lacus. Donec tempus sit amet metus sit amet gravida. Proin convallis felis at mattis eleifend. Aenean porta mauris est. Fusce nec faucibus ligula, eget tincidunt orci. Aenean elementum, turpis non sodales condimentum, sapien eros viverra urna, laoreet pharetra sapien lectus in augue.

Nullam leo felis, accumsan ac convallis in, fermentum at nisl. Nunc dignissim elit eget eros gravida, et consectetur ex euismod. Nam porta sollicitudin iaculis. Aenean bibendum commodo tellus id rhoncus. Integer sodales ex justo. Sed imperdiet lacinia quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eu mollis arcu. Ut pellentesque mi in nunc condimentum vehicula. Nunc convallis ligula eget orci pulvinar ultricies. Morbi tincidunt tortor ac nulla pharetra, condimentum rhoncus velit aliquet. Sed ac ultricies nibh. Morbi placerat feugiat urna a rhoncus. Sed efficitur laoreet tortor sit amet ullamcorper. Phasellus ultricies sem eget vehicula scelerisque. Aliquam porttitor accumsan quam at sollicitudin.`;
		//this.getProblem(routeParams.get('username'), routeParams.get('problem-id'));
	}

	private async getProblem(username: String, problemId: String) {

		//const problem = await this.gitHubService.getProblem(username, problemId);

		//this.text = problem.text;
		//this.code = problem.code;
	}

}
