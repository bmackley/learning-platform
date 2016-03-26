import {Component, Inject, Input} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';

@Component({
	selector: 'sm-code-mirror',
	template: `
        <!--<textarea #codeTextArea type="text" (keyup)="textChanged(codeTextArea.value)" style="height: 250px; width: 100%" placeholder="Enter code here" [innerHTML]="originalCode || ''"></textarea>-->
        <textarea id="sm-code-mirror-textarea"></textarea>
    `
})

export class CodeMirrorComponent {

    @Input() originalCode;

    private store;
    private codeMirrorInstance;

	constructor(@Inject(Constants.REDUX_STORE) store) {
        this.store = store;
	}

    initCodeMirror() {
        const codeMirrorTextarea = document.getElementById('sm-code-mirror-textarea');
        this.codeMirrorInstance = CodeMirror(function(elt) {
            codeMirrorTextarea.parentNode.replaceChild(elt, codeMirrorTextarea);
        }, {
            mode: 'javascript',
            lineNumbers: true
        });

        this.codeMirrorInstance.on('change', (e) => {
            this.textChanged(this.codeMirrorInstance.getValue());
        });
    }

    textChanged(value) {
        Actions.setEditProblemCode.execute(this.store, value);
    }

    ngOnInit() {
        this.initCodeMirror();
    }

    ngOnChanges() {
        if (this.originalCode) {
            this.codeMirrorInstance.setValue(this.originalCode);
        }
    }
}
