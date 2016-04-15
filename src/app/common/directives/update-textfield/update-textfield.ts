import {Component, EventEmitter} from 'angular2/core';
import {Input} from 'angular2/core';
import {Output} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'update-textfield',
    template: `<input type="text" class="form-control" [ngClass]="{nofocus: !hasFocus}" (click)="focus()" (focusout)="focusOut()" [(ngModel)]="value.name">`,
    styles: [require('./update-textfield.css')],
    providers: [CORE_DIRECTIVES, FORM_DIRECTIVES]

})

export class UpdateTextfield {
    @Input() value: any;
    @Output() changeEmitter: EventEmitter<string> =  new EventEmitter();

    hasFocus: boolean;
    origin: string;

    focus() {
        this.hasFocus = true;
        this.origin = this.value.name;
    }

    focusOut() {
        this.hasFocus = false;
        if (this.value.name !== this.origin) {
            if (this.value.name.length === 0) {
                this.value.name = this.origin;
            } else {
                this.changeEmitter.emit(this.value);
            }
        }
    }

}