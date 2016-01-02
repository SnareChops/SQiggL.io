import {Component, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {OnActivate} from 'angular2/router';

@Component({
    selector: 'query',
    templateUrl: 'templates/query.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class QueryComponent implements OnActivate{
    public query: string = `{+ env: 'Dev'}
{+ fields: ['name', 'age', 'bday']}
{# This uses an iterable expression}
SELECT {var of fields using ','} FROM {env}Table;

{# Conditionally include or exclude text}
{% if env = 'Dev'}
    UPDATE {env}Table SET RequestedAt = 'NOW()';
{% endif}`;
    @Output()
    public querySubmitted: EventEmitter<string> = new EventEmitter<string>();

    public parse(){
        this.querySubmitted.emit(this.query);
    }

    public routerOnActivate(){
        console.log('OnActivate');
    }
}