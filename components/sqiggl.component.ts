import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ResultComponent} from './result.component';
import {QueryComponent} from './query.component';

@Component({
    selector: 'sqiggl-io',
    templateUrl: 'templates/sqiggl.html',
    directives: [QueryComponent, ResultComponent, CORE_DIRECTIVES]
})
export class SQiggLComponent{
    public result: string;

    public parse(query: string){
        try {
            this.result = window['SQiggL'].parse(query);
        } catch(error){
            this.result = error.toString();
        }
    }
}