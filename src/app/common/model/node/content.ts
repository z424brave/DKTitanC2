import {Media} from './media';
import {Language} from '../language';
import {BaseEntity} from '../../base-entity';

export class Content extends BaseEntity {
    user: string;
    media: Media[];
    versionNo: number;
    versionMessage: string;
    translated: boolean;

    constructor() {
        super();
    }

}
