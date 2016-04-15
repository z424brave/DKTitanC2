import {Component, EventEmitter, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {Tag} from '../../model/lexicon/tag';
import {Lexicon} from '../../model/lexicon/lexicon';
import {ContentNode} from '../../model/node/content-node';
import {TagService} from '../../service/tag-service';

let _ = require('lodash');

@Component({
    selector: 'tag-select',
    template: require('./tag-select.html'),
    styles: [require('./tag-select.css')],
    directives: [CORE_DIRECTIVES],
    providers: [TagService]
})

export class TagSelect implements OnInit {

    @Input() tags: Array<Tag> = [];
    @Input() selectedTags: Array<Tag> = [];
    @Input() nodeEmitter: EventEmitter<ContentNode>;
	
    node: ContentNode;

	lexicons: Array<Lexicon> = [];	
    
	constructor(private _tagService: TagService) {

    }
	
    selectTag(tag) {

        console.log('selected tag: ' + tag.name);
        if (_.findIndex(this.selectedTags, function (currentTag) {
                return currentTag._id === tag._id;
            }) === -1) {
            this.selectedTags.push(tag);
        } else {
            this.removeTag(tag);
        }
        
		if (this.node) {
			this.node.tags = _.map(this.selectedTags, '_id');
		}	

    }

    removeTag(tag) {
	
		console.log(`in removeTag ${JSON.stringify(tag)}`);
        _.remove(this.selectedTags, function (currentTag) {
            return currentTag._id === tag._id;
        });
		
 		if (this.node) {
			this.node.tags = _.map(this.selectedTags, '_id');
		}
		
    }

    onNodeChange(node: ContentNode) {
	    console.log(`in onNodeChange - ${JSON.stringify(node)}`);		
	    console.log(`in onNodeChange - ${JSON.stringify(node.tags)}`); 
        this.buildSelectedTags(node.tags);
        this.node = node;

    }

	buildSelectedTags(nodeTags: Array<string>) {

		while(this.selectedTags.length > 0) { this.selectedTags.pop(); }

	    console.log(`in buildSelectedTags - ${JSON.stringify(this.selectedTags)}`);

        for (var nodeTag of nodeTags) {
            var selectedTag = _.find(this.tags, function (t) {
                return t._id === nodeTag;
            });
            if (selectedTag) {
                this.selectedTags.push(selectedTag);
            }
        }
	
	    console.log(`in buildSelectedTags - ${JSON.stringify(this.selectedTags)}`); 	

	}

    ngOnInit() {
		
        this.nodeEmitter.subscribe(node =>
            this.onNodeChange(node));

        this._tagService.getLexicons().subscribe(
            data => {
				this.lexicons = data;
                this.tags = _.flatMap(_.map(this.lexicons, 'tags'));   				
				console.log(`in ngOnInit - Lexicons : ${this.lexicons.length} - ${JSON.stringify(this.lexicons)}`);					
				console.log(`in ngOnInit - Tags : ${this.tags.length} - ${JSON.stringify(this.tags)}`);	
			}	
        );
		
    }

}
