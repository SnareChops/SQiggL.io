import {Component} from 'angular2/core';
import {Variable} from './variable.component';

@Component({
    selector: 'variable-section',
    templateUrl: 'templates/variable.section.html'
})
export class VariableSectionComponent{
   public variables: Variable[];
}