/// <reference path="../typings/tsd.d.ts" />
import Module from './app.module';
class Router {
    constructor($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('docs', {
            url: '/docs/:item?',
            templateUrl: 'templates/docs.html',
            controller: 'DocsController',
            controllerAs: 'docs'
        })
        .state('srcdocs', {
            url: '/srcdocs/:item?',
            templateUrl: 'templates/srcdocs.html',
            controller: 'SrcDocsController',
            controllerAs: 'docs'
        });
    }
}
Module.config(Router);