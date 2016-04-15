import {Component, OnInit, EventEmitter} from 'angular2/core';
import {ComponentInstruction, CanActivate} from 'angular2/router';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';

import {Lexicon} from './../common/model/lexicon/lexicon';
import {Tag} from '../common/model/lexicon/tag';

import {TagService} from './../common/service/tag-service';
import {authCheck} from '../auth/auth-check';
import {MainMenu} from '../menu/menu-component';
import {UpdateTextfield} from '../common/directives/update-textfield/update-textfield';

let _ = require('lodash');

@Component({
    template: require('./lexicon.html'),
    styles: [require('./lexicon.css'), require('../app.css')],
    providers: [TagService, CORE_DIRECTIVES, FORM_DIRECTIVES,],
    directives: [UpdateTextfield, MainMenu]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck('admin', next, previous);
})

export class LexiconComponent implements OnInit {

    lexicons: Lexicon[];

    lexicon: Lexicon;

    newLexicon: Lexicon;

    tags: Tag[];

    newTag: Tag;

    confirmDelete: boolean;

    constructor(private _tagService: TagService) {

    }

    ngOnInit() {
        this.init();

    }

    init() {
	    console.log(`In init in lexicon`);	
        this._tagService.getLexicons()
            .subscribe(
                data => this.lexicons = data
            );
        this.lexicon = new Lexicon();
        this.newLexicon = new Lexicon();
        this.newTag = new Tag();
    }

    onLexiconSelectChanged(lexiconId: string) {
	    console.log(`In onLexiconSelectChanged with ${lexiconId}`);	
        this.lexicon = _.find(this.lexicons, function (t) {
            return t._id === lexiconId;
        });

        this._tagService.getTags(lexiconId)
            .subscribe(
                tags => this.tags = tags
            );

        this.newLexicon = new Lexicon();
        this.newTag = new Tag();
    }

    createLexicon() {

        if (this.newLexicon.name) {
            this._tagService.saveLexicon(this.newLexicon)
                .subscribe(
                    lexicon => {
                        this._tagService.getLexicons()
                            .subscribe(
                                data => {
                                    this.lexicons = data;
                                    this.newLexicon = new Lexicon();
                                    this.onLexiconSelectChanged(lexicon._id);
                                }
                            );
                    }
                );
        }

    }

    deleteLexicon() {
        this.confirmDelete = true;
    }

    cancelDelete() {
        this.confirmDelete = false;
    }

    doDeleteLexicon() {
        this._tagService.deleteLexicon(this.lexicon)
            .subscribe(
                response => {
                    this.cancelDelete();
                    this.init();
                }
            );
    }

    addTag() {
        if (this.newTag.name) {
            this._tagService.addTag(this.lexicon._id, this.newTag)
                .subscribe(res =>
                    this.onLexiconSelectChanged(this.lexicon._id)
                );
        }
    }

    deleteTag(tagId: string) {
        this._tagService.deleteTag(this.lexicon._id, tagId)
            .subscribe(res =>
                this.onLexiconSelectChanged(this.lexicon._id)
            );
    }

    onLexiconUpdated(lexicon: Lexicon) {
	    console.log(`In onLexiconUpdated ${lexicon.name}`);		
        this._tagService.updateLexicon(this.lexicon)
            .subscribe(res =>
                console.log(`onLexiconUpdated - response from update - ${JSON.stringify(res)}`)
            );		
    }

    onTagUpdated(tag: Tag) {
	    console.log(`In onTagUpdated ${tag.name}`);		
        this._tagService.updateTag(this.lexicon._id, tag)
            .subscribe(res =>
                console.log(`onTagUpdated - response from update - ${JSON.stringify(res)}`)
            );		

    }

}
