var module = angular.module("myApp", []);

module.directive("simpleDirective", ["simpleDataSharingService", function(simpleDataSharingService) {
    return {

        controller: function($scope){

            $scope.click = function() {
                simpleDataSharingService.addData("Click in " + (new Date).getTime());
            }

            $scope.getData = function() {
                return simpleDataSharingService.getData();
            }
        }
    }
}]);

module.service("simpleDataSharingService", [function() {
    var data = "";

    function addData(newData){
        data += newData + "\n";
    }

    function getData() {
        return data;
    }

    return {
        addData: addData,
        getData: getData
    };
}]);
