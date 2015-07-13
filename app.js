(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="../typings/tsd.d.ts" />
var AppConfig = (function () {
    function AppConfig(markedProvider, $mdThemingProvider, $interpolateProvider) {
        markedProvider.setOptions({ gfm: true, tables: true, breaks: true });
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('amber');
        $interpolateProvider.startSymbol('//').endSymbol('//');
    }
    return AppConfig;
})();
var Module = angular.module('sqiggl', ['ngMaterial', 'ui.router', 'hc.marked', 'angular.filter', 'firebase']).config(['markedProvider', '$mdThemingProvider', '$interpolateProvider', AppConfig]);
exports.default = Module;

},{}],2:[function(require,module,exports){
/// <reference path="../typings/tsd.d.ts" />
var app_module_1 = require('./app.module');
var Router = (function () {
    function Router($stateProvider, $urlRouterProvider) {
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
    return Router;
})();
app_module_1["default"].config(Router);

},{"./app.module":1}],3:[function(require,module,exports){
/// <reference path="../typings/tsd.d.ts" />
var app_module_1 = require('./app.module');
var DocsController = (function () {
    function DocsController() {
    }
    return DocsController;
})();
exports["default"] = DocsController;
app_module_1["default"].controller('DocsController', [DocsController]);

},{"./app.module":1}],4:[function(require,module,exports){
/// <reference path="../typings/tsd.d.ts" />
var app_module_1 = require('./app.module');
Array.prototype['remove'] = function (item) {
    this.splice(this.indexOf(item), 1);
};
var HomeController = (function () {
    function HomeController($firebaseArray) {
        var _this = this;
        this.$firebaseArray = $firebaseArray;
        this.input = "UPDATE Names {{% if example is not null %}} SET Name = '{{example}}' {{% else %}} SET Name = 'Cow' {{% endif %}} WHERE Name = 'Awesome'";
        this.output = 'Enter your query to the left and press Execute';
        this.variables = [{ key: "example", value: "dragon" }];
        this.errors = [];
        //Patch console.error to show errors to screen as well.
        var originalConsoleError = console.error;
        console.error = function (error, array) {
            _this.errors.push(error);
            originalConsoleError.call(console, error, array);
        };
        this.firebaseArray = $firebaseArray(new Firebase('https://sqiggl.firebaseio.com/queries'));
    }
    HomeController.prototype.parse = function () {
        this.errors = [];
        var variables = {};
        for (var _i = 0, _a = this.variables; _i < _a.length; _i++) {
            var variable = _a[_i];
            variables[variable.key] = variable.value;
        }
        try {
            this.output = SQiggL.parse(this.input, variables);
            this.reportQuery(this.input, this.output, this.errors);
        }
        catch (error) {
            this.reportQuery(this.input, this.output, error);
            throw error;
        }
    };
    HomeController.prototype.addVariable = function () {
        this.variables.push({ key: null, value: null });
    };
    HomeController.prototype.deleteVariable = function (variable) {
        this.variables['remove'](variable);
    };
    HomeController.prototype.reportQuery = function (query, output, errors) {
        this.firebaseArray.$add({ query: query, output: output, errors: errors });
    };
    return HomeController;
})();
app_module_1["default"].controller('HomeController', ['$firebaseArray', HomeController]);

},{"./app.module":1}],5:[function(require,module,exports){
/// <reference path ="../typings/tsd.d.ts" />
var app_module_1 = require('./app.module');
var SrcDocsController = (function () {
    function SrcDocsController($http, $stateParams) {
        var _this = this;
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.docs = [];
        $http.get('docs.json').then(function (response) {
            response.data.forEach(function (item) {
                var match = item.match(/(\w*)[\\\/](\w+)(?=\.md)/);
                var parent = match[1];
                var name = match[2];
                _this.docs.push({ parent: parent === 'docs' ? 'core' : parent, name: name, url: item, show: $stateParams.item === name });
            });
            setTimeout(function () {
                var elements = document.querySelectorAll('.srcdocs a');
                Array.prototype.forEach.call(elements, function (element) {
                    var href = element.getAttribute('href');
                    element.setAttribute('href', href.replace(/#(.*)/, function (match, $1) { return ("#/docs/" + $1); }));
                });
            }, 500);
        });
    }
    return SrcDocsController;
})();
app_module_1["default"].controller('SrcDocsController', ['$http', '$stateParams', SrcDocsController]);

},{"./app.module":1}]},{},[1,2,3,4,5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9hcHAubW9kdWxlLnRzIiwidHMvYXBwLnJvdXRlcy50cyIsInRzL2RvY3MuY29udHJvbGxlci50cyIsInRzL2hvbWUuY29udHJvbGxlci50cyIsInRzL3NyY2RvY3MuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLDRDQUE0QztBQUM1QztJQUNJLG1CQUFZLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxvQkFBa0Q7UUFDOUYsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUVuRSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ2xDLGNBQWMsQ0FBQyxRQUFRLENBQUM7YUFDeEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhCLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FWQSxJQVVDO0FBRUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLHNCQUFzQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQy9LLGVBQU8sVUFEeUs7QUFDdks7O0FDZDNCLDRDQUE0QztBQUM1QywyQkFBbUIsY0FBYyxDQUFDLENBQUE7QUFDbEM7SUFDSSxnQkFBWSxjQUFjLEVBQUUsa0JBQWtCO1FBQzFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxH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QUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5jbGFzcyBBcHBDb25maWcge1xuICAgIGNvbnN0cnVjdG9yKG1hcmtlZFByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICRpbnRlcnBvbGF0ZVByb3ZpZGVyOiBhbmd1bGFyLklJbnRlcnBvbGF0ZVByb3ZpZGVyKXtcbiAgICAgICAgbWFya2VkUHJvdmlkZXIuc2V0T3B0aW9ucyh7Z2ZtOiB0cnVlLCB0YWJsZXM6IHRydWUsIGJyZWFrczogdHJ1ZX0pO1xuICAgICAgICBcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcbiAgICAgICAgLnByaW1hcnlQYWxldHRlKCdpbmRpZ28nKVxuICAgICAgICAuYWNjZW50UGFsZXR0ZSgnYW1iZXInKTtcbiAgICAgICAgXG4gICAgICAgICRpbnRlcnBvbGF0ZVByb3ZpZGVyLnN0YXJ0U3ltYm9sKCcvLycpLmVuZFN5bWJvbCgnLy8nKTtcbiAgICB9XG59XG5cbmxldCBNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnc3FpZ2dsJywgWyduZ01hdGVyaWFsJywgJ3VpLnJvdXRlcicsICdoYy5tYXJrZWQnLCAnYW5ndWxhci5maWx0ZXInLCAnZmlyZWJhc2UnXSkuY29uZmlnKFsnbWFya2VkUHJvdmlkZXInLCAnJG1kVGhlbWluZ1Byb3ZpZGVyJywgJyRpbnRlcnBvbGF0ZVByb3ZpZGVyJywgQXBwQ29uZmlnXSk7XG5leHBvcnQge01vZHVsZSBhcyBkZWZhdWx0fTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4vYXBwLm1vZHVsZSc7XG5jbGFzcyBSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvaG9tZS5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdob21lJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2RvY3MnLCB7XG4gICAgICAgICAgICB1cmw6ICcvZG9jcy86aXRlbT8nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvZG9jcy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEb2NzQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdkb2NzJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ3NyY2RvY3MnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc3JjZG9jcy86aXRlbT8nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvc3JjZG9jcy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTcmNEb2NzQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdkb2NzJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG5Nb2R1bGUuY29uZmlnKFJvdXRlcik7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuaW1wb3J0IE1vZHVsZSBmcm9tICcuL2FwcC5tb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2NzQ29udHJvbGxlciB7XG4gICAgXG59XG5Nb2R1bGUuY29udHJvbGxlcignRG9jc0NvbnRyb2xsZXInLCBbRG9jc0NvbnRyb2xsZXJdKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4vYXBwLm1vZHVsZSc7XG5kZWNsYXJlIHZhciBTUWlnZ0w6IGFueTtcbmludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgcmVtb3ZlKFQpO1xufVxuQXJyYXkucHJvdG90eXBlWydyZW1vdmUnXSA9IGZ1bmN0aW9uKGl0ZW0pe1xuICAgIHRoaXMuc3BsaWNlKHRoaXMuaW5kZXhPZihpdGVtKSwgMSk7XG59XG5pbnRlcmZhY2UgSVZhcmlhYmxlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xufVxuY2xhc3MgSG9tZUNvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBpbnB1dDpzdHJpbmcgPSBcIlVQREFURSBOYW1lcyB7eyUgaWYgZXhhbXBsZSBpcyBub3QgbnVsbCAlfX0gU0VUIE5hbWUgPSAne3tleGFtcGxlfX0nIHt7JSBlbHNlICV9fSBTRVQgTmFtZSA9ICdDb3cnIHt7JSBlbmRpZiAlfX0gV0hFUkUgTmFtZSA9ICdBd2Vzb21lJ1wiO1xuICAgIHB1YmxpYyBvdXRwdXQ6IHN0cmluZyA9ICdFbnRlciB5b3VyIHF1ZXJ5IHRvIHRoZSBsZWZ0IGFuZCBwcmVzcyBFeGVjdXRlJztcbiAgICBwdWJsaWMgdmFyaWFibGVzOiBJVmFyaWFibGVbXSA9IFt7a2V5OiBcImV4YW1wbGVcIiwgdmFsdWU6IFwiZHJhZ29uXCJ9XTtcbiAgICBwdWJsaWMgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHB1YmxpYyBmaXJlYmFzZUFycmF5OiBBbmd1bGFyRmlyZUFycmF5O1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyAkZmlyZWJhc2VBcnJheSl7XG4gICAgICAgIC8vUGF0Y2ggY29uc29sZS5lcnJvciB0byBzaG93IGVycm9ycyB0byBzY3JlZW4gYXMgd2VsbC5cbiAgICAgICAgbGV0IG9yaWdpbmFsQ29uc29sZUVycm9yID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgY29uc29sZS5lcnJvciA9IChlcnJvciwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgICAgb3JpZ2luYWxDb25zb2xlRXJyb3IuY2FsbChjb25zb2xlLCBlcnJvciwgYXJyYXkpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maXJlYmFzZUFycmF5ID0gJGZpcmViYXNlQXJyYXkobmV3IEZpcmViYXNlKCdodHRwczovL3NxaWdnbC5maXJlYmFzZWlvLmNvbS9xdWVyaWVzJykpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgcGFyc2UoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XG4gICAgICAgIGxldCB2YXJpYWJsZXMgPSB7fTtcbiAgICAgICAgZm9yKGxldCB2YXJpYWJsZSBvZiB0aGlzLnZhcmlhYmxlcyl7XG4gICAgICAgICAgICB2YXJpYWJsZXNbdmFyaWFibGUua2V5XSA9IHZhcmlhYmxlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRoaXMub3V0cHV0ID0gU1FpZ2dMLnBhcnNlKHRoaXMuaW5wdXQsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydFF1ZXJ5KHRoaXMuaW5wdXQsIHRoaXMub3V0cHV0LCB0aGlzLmVycm9ycyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydFF1ZXJ5KHRoaXMuaW5wdXQsIHRoaXMub3V0cHV0LCBlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgYWRkVmFyaWFibGUoKXtcbiAgICAgICAgdGhpcy52YXJpYWJsZXMucHVzaCh7a2V5Om51bGwsIHZhbHVlOiBudWxsfSk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBkZWxldGVWYXJpYWJsZSh2YXJpYWJsZTogSVZhcmlhYmxlKXtcbiAgICAgICAgdGhpcy52YXJpYWJsZXNbJ3JlbW92ZSddKHZhcmlhYmxlKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHJlcG9ydFF1ZXJ5KHF1ZXJ5LCBvdXRwdXQsIGVycm9ycyl7XG4gICAgICAgIHRoaXMuZmlyZWJhc2VBcnJheS4kYWRkKHtxdWVyeTogcXVlcnksIG91dHB1dDogb3V0cHV0LCBlcnJvcnM6IGVycm9yc30pO1xuICAgIH1cbiAgICBcbn1cbk1vZHVsZS5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIFsnJGZpcmViYXNlQXJyYXknLCBIb21lQ29udHJvbGxlcl0pOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGggPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4vYXBwLm1vZHVsZSc7XG5cbmludGVyZmFjZSBJRG9jcyB7XG4gICAgcGFyZW50OiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIHNob3c6IGJvb2xlYW47XG59XG5jbGFzcyBTcmNEb2NzQ29udHJvbGxlciB7XG4gICAgcHVibGljIGRvY3M6IElEb2NzW10gPSBbXTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgJGh0dHAsIHB1YmxpYyAkc3RhdGVQYXJhbXMpe1xuICAgICAgICAkaHR0cC5nZXQoJ2RvY3MuanNvbicpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IGl0ZW0ubWF0Y2goLyhcXHcqKVtcXFxcXFwvXShcXHcrKSg/PVxcLm1kKS8pO1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jcy5wdXNoKHtwYXJlbnQ6IHBhcmVudCA9PT0gJ2RvY3MnID8gJ2NvcmUnIDogcGFyZW50LCBuYW1lOiBuYW1lLCB1cmw6IGl0ZW0sIHNob3c6ICRzdGF0ZVBhcmFtcy5pdGVtID09PSBuYW1lfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcmNkb2NzIGEnKTtcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaHJlZiA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZi5yZXBsYWNlKC8jKC4qKS8sIChtYXRjaCwgJDEpID0+IGAjL2RvY3MvJHskMX1gKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5Nb2R1bGUuY29udHJvbGxlcignU3JjRG9jc0NvbnRyb2xsZXInLCBbJyRodHRwJywgJyRzdGF0ZVBhcmFtcycsIFNyY0RvY3NDb250cm9sbGVyXSk7Il19
