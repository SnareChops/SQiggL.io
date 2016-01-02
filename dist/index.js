System.register(["angular2/core", 'angular2/platform/browser', 'angular2/router', "./components/sqiggl.component"], function(exports_1) {
    var core_1, browser_1, router_1, sqiggl_component_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sqiggl_component_1_1) {
                sqiggl_component_1 = sqiggl_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(sqiggl_component_1.SQiggLComponent, [router_1.ROUTER_PROVIDERS, core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]);
        }
    }
});
