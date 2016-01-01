System.register(['angular2/platform/browser', "./components/sqiggl.component"], function(exports_1) {
    var browser_1, sqiggl_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (sqiggl_component_1_1) {
                sqiggl_component_1 = sqiggl_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(sqiggl_component_1.SQiggLComponent);
        }
    }
});
