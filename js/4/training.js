var module = angular.module('myApp', []);

module.directive('simpleDirective', ['$rootScope', function($rootScope) {
    
    return {
        controller: function($scope) {
            $scope.customEventName = 'customEvent';
            $scope.content = "";

            $scope.click = function () {
                debugger;
                $rootScope.$broadcast($scope.customEventName, $scope.identifier);
            }

            $scope.$on($scope.customEventName, function (event, identifier) {
                console.log(arguments);
                $scope.content += ("Event was received from id = " + identifier + "\n");
            });
        }
    };
}]);