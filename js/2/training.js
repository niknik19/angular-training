var module = angular.module('myApp', []);

module.controller("SimpleController", ["$scope", function ($scope) {

}]);

module.directive("trainingTabPanel", function () {

    return {
        scope: {
            callbacks: "="
        },
        restrict: "E",
        transclude: true,
        link: function (scope, iElement, iAttrs, controller) {

        },
        controller: function ($scope, $element, $attrs, $transclude) {

        },
        template:

        '<ul class="nav nav-tabs" >' +
            '<li role="presentation" ng-repeat="callback in callbacks">' +
                '<a href="#" ng-click="callback()"> {{ "Tab # " + $index }} </a>' +
            '</li>' +
        '</ul>' + 
        '<div>' + 
            '<ng-transclude />' + 
        '</div>'
    }
});

module.run(["$rootScope", function ($rootScope) {

    function generateContent(index) {
        return function () {
            console.log("Generating content " + index);
            $rootScope.tabContent = "Content " + index;
        }
    };
    
    $rootScope.tabContent = "Default content";

    $rootScope.callbacks = [
        generateContent(1),
        generateContent(2),
        generateContent(3)
    ];
}]);