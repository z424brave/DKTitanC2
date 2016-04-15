import {Language} from '../../common/model/language';
import {Media} from './../../common/model/node/media';

export class ContentTab {

    title: string;
    content: string;
    versionMessage: string;


    constructor(public media: Media,
                public active: boolean,
                public isLast: boolean) {

              this.title = media.language.iso3166;
              this.content = media.content;

    }
}