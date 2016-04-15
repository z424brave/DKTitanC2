/// <reference path="../../../../typings/browser/definitions/tinymce/tinymce.d.ts" />
//var tinymce: any = require("../../../../node_modules/tinymce/tinymce");
import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef, Inject, AfterViewInit} from 'angular2/core';


declare var tinymce: any;

@Component({
    selector: 'content-editor',
    template: `<textarea class="content-editor" style="height:300px">{{editorContent}}</textarea>`,
    styles: [require('./content-editor.css')]

})

export class ContentEditor implements OnInit, OnDestroy, AfterViewInit {

    @Input() editorContent: any;
    @Input() language: any;
    @Input() isLast: boolean;
    @Input() active: boolean;	
    @Output() editorContentChange: EventEmitter<any>;

    private elementRef: ElementRef;
    private elementID: string;
    private htmlContent: string;
 
    constructor(@Inject(ElementRef) elementRef: ElementRef)
    {
        this.elementRef = elementRef;
		this.elementID = "";
		console.log(`in constructor - ${this.elementID} : ${new Date()}`);		
        this.editorContentChange = new EventEmitter();
    }

    ngOnInit() {
	
		console.log(`in ngOnInit in editor - ${this.elementID} : ${this.active} : ${this.isLast} : ${new Date()}`);

    };

	public ngOnDestroy():void {

		console.log(`in ngOnDestroy in editor - ${this.elementID} : ${this.active} : ${this.isLast} : ${new Date()}`);

        //destroy cloned elements
//        tinymce.get(this.elementID).remove();
		
	}
    
	ngAfterViewInit() {

        //Clone base textarea
//        var baseEditorArea = this.elementRef.nativeElement.querySelector("#baseEditorArea");
//        var clonedEditorArea = baseEditorArea.cloneNode(true);
//        clonedEditorArea.id = this.elementID;	
		var that = this;
		tinymce.init(
		
			{
				selector: '.content-editor',
				init_instance_callback : function(editor) {
					console.log(`Editor: ${editor.id} is now initialized - ${tinymce.majorVersion} / ${tinymce.minorVersion}`);
					that.elementID = editor.id; 
				},	
//                mode: 'exact',				
				plugins: ['code'],
//				elements: "baseEditorArea",
				menubar: false,
				toolbar1: 'bold italic underline strikethrough alignleft ' +
				'aligncenter alignright alignjustify styleselect   ' +
				'bullist numlist outdent indent blockquote undo ' +
				'redo removeformat subscript superscript | code',
				setup: (editor) => {
					editor.on('change', (e, l) => {
						console.log(`emitting editor change`); 
						that.editorContentChange.emit(
							editor.getContent()
						);
					});

				}
			});
				
		
    };

}
