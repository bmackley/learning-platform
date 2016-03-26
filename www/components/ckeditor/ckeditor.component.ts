import {Component, Inject, Input, ViewEncapsulation, OnChanges, OnDestroy, OnInit} from 'angular2/core';
import {Constants} from '../../services/constants.service.ts';
import {Actions} from '../../redux/actions.ts';

@Component({
	selector: 'sm-ckeditor',
	template: `
        <!--<textarea id="sm-ckeditor-textarea" #textTextArea type="text" (keyup)="textChanged(textTextArea.value)" style="height: 250px; width: 100%" placeholder="Enter text here" [innerHTML]="originalText || ''"></textarea>-->
        <textarea id="sm-ckeditor-textarea"></textarea>
    `
})

export class CkeditorComponent implements OnChanges, OnDestroy, OnInit {

    @Input() originalText;

    private store;

	constructor(@Inject(Constants.REDUX_STORE) store) {
        this.store = store;
	}

    initCKEditor() {
        CKEDITOR.on('instanceCreated', (e) => {
            e.editor.on('change', (e) => {
                this.textChanged(e.editor.getData());
            });
        });

        CKEDITOR.replace('sm-ckeditor-textarea');
        CKEDITOR.config.height = 300;
    }

    textChanged(value) {
        Actions.setEditProblemText.execute(this.store, value);
    }

    ngOnInit() {
        this.initCKEditor();
    }

    ngOnChanges() {
        setTimeout(() => {
            CKEDITOR.instances['sm-ckeditor-textarea'] && this.originalText && CKEDITOR.instances['sm-ckeditor-textarea'].setData(this.originalText);
        }, 250);
    }

    ngOnDestroy() {
        CKEDITOR.instances['sm-ckeditor-textarea'] && CKEDITOR.instances['sm-ckeditor-textarea'].destroy();
    }
}
