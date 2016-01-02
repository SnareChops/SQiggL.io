import {Component, Input} from 'angular2/core';

@Component({
    selector: 'result',
    templateUrl: 'templates/result.html'
})
export class ResultComponent{
    @Input()
    public result: string;
}

