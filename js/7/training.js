var module = angular.module('myApp', []);

module.controller("simpleController", ["$scope", function($scope) {
    $scope.showCurrent = function() {
        alert("VALUE IS : " + $scope.current);
    }

    $scope.changeLog = "";
    $scope.onValueChanged = function(value)  {
        $scope.changeLog += (new Date).toISOString() + ": changed value to: " + value + "\r\n";
    }
}]);

module.directive("maskedInput", [function() {
    return {
        scope: {
            class: "@",
            val: "=",
            mask: "=",
            current: "=",
            onValueChanged: '&'
        },
        template: "<input class='{{class}}' />",
        replace: true,

        link: function(scope, iElement, iAttrs, controller) {

                var element = $(iElement[0]);

                scope.$watch('val', function(newValue) {
                    scope.val = newValue || '';
                    scope.mask = scope.mask || '';
                    element.mask(scope.mask);
                    element.val(element.masked(scope.val));
                    scope.current = scope.val;
                    scope.onValueChanged({ value: scope.val});
                });

                scope.$watch('mask', function (newValue) {
                    scope.mask = newValue || '';
                    scope.val = scope.val || '';
                    element.mask(scope.mask);
                    element.val(element.masked(scope.val));
                    scope.current = scope.val;
                });
            }
    }
}]
);
