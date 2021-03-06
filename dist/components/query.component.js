System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var QueryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            QueryComponent = (function () {
                function QueryComponent() {
                    this.query = "{+ env: 'Dev'}\n{+ fields: ['name', 'age', 'bday']}\n{# This uses an iterable expression}\nSELECT {var of fields using ','} FROM {env}Table;\n\n{# Conditionally include or exclude text}\n{% if env = 'Dev'}\n    UPDATE {env}Table SET RequestedAt = 'NOW()';\n{% endif}";
                    this.querySubmitted = new core_1.EventEmitter();
                }
                QueryComponent.prototype.parse = function () {
                    this.querySubmitted.emit(this.query);
                };
                QueryComponent.prototype.routerOnActivate = function () {
                    console.log('OnActivate');
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], QueryComponent.prototype, "querySubmitted", void 0);
                QueryComponent = __decorate([
                    core_1.Component({
                        selector: 'query',
                        templateUrl: 'templates/query.html',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], QueryComponent);
                return QueryComponent;
            })();
            exports_1("QueryComponent", QueryComponent);
        }
    }
});
