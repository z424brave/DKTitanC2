import {BaseEntity} from '../../base-entity';
import {Language} from '../language';

export class Media extends BaseEntity {

    language: Language;
    content: string;

    constructor() {
        super();

    }


}