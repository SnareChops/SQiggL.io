import {Component} from 'angular2/core';
import {ResultComponent} from "./result.component";
import {QueryComponent} from "./query.component";

@Component({
    selector: 'home',
    providers: [],
    templateUrl: 'templates/home.html',
    directives: [QueryComponent, ResultComponent],
    pipes: []
})
export class HomeComponent{
    public result: string;

    public parse(query: string){
        try {
            this.result = window['SQiggL'].parse(query);
        } catch(error){
            this.result = error.toString();
        }
    }
}