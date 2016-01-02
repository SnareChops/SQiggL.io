import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {CORE_DIRECTIVES} from 'angular2/common';
import {PluginsComponent} from "./plugins.component";
import {HomeComponent} from "./home.component";

@Component({
    selector: 'sqiggl-io',
    templateUrl: 'templates/sqiggl.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', component: HomeComponent, as: 'Home', useAsDefault: true},
    {path: '/plugins', component: PluginsComponent, as: 'Plugins'}
])
export class SQiggLComponent{

}