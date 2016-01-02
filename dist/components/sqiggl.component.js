System.register(['angular2/core', 'angular2/router', "./plugins.component", "./home.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, plugins_component_1, home_component_1;
    var SQiggLComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (plugins_component_1_1) {
                plugins_component_1 = plugins_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            }],
        execute: function() {
            SQiggLComponent = (function () {
                function SQiggLComponent() {
                }
                SQiggLComponent = __decorate([
                    core_1.Component({
                        selector: 'sqiggl-io',
                        templateUrl: 'templates/sqiggl.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: home_component_1.HomeComponent, as: 'Home', useAsDefault: true },
                        { path: '/plugins', component: plugins_component_1.PluginsComponent, as: 'Plugins' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], SQiggLComponent);
                return SQiggLComponent;
            })();
            exports_1("SQiggLComponent", SQiggLComponent);
        }
    }
});
