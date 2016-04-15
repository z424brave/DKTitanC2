import {Pipe, PipeTransform} from 'angular2/core';

let dateformat = require('dateformat');

@Pipe({name: 'isoDate'})
export class IsoDatePipe implements PipeTransform {
    transform(value: string, args:string[]): any {
        return dateformat(Date.parse(value), args[0]);
    }
}