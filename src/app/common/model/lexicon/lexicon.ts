import {BaseEntity} from '../../base-entity';
import {Tag} from './tag';

export class Lexicon extends BaseEntity {

    name: string;
    tags: [Tag];
    constructor() {
        super();
    }

}
