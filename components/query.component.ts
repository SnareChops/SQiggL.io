import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'query',
    templateUrl: 'templates/query.html'
})
export class QueryComponent{
    public query: string;
    @Output()
    public querySubmitted: EventEmitter<string> = new EventEmitter<string>();

    public parse(){
        this.querySubmitted.emit(this.query);
    }
}