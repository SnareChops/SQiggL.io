/// <reference path="../typings/tsd.d.ts" />
class AppConfig {
    constructor(markedProvider, $mdThemingProvider, $interpolateProvider: angular.IInterpolateProvider){
        markedProvider.setOptions({gfm: true, tables: true, breaks: true});
        
        $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('amber');
        
        $interpolateProvider.startSymbol('//').endSymbol('//');
    }
}

let Module = angular.module('sqiggl', ['ngMaterial', 'ui.router', 'hc.marked', 'angular.filter', 'firebase']).config(['markedProvider', '$mdThemingProvider', '$interpolateProvider', AppConfig]);
export {Module as default};