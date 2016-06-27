var module = angular.module('myApp', []);

module.controller("simpleController", ["$scope", "$timeout", "$http", function($scope, $timeout, $http) {

    $scope.clickContent = "";
    $scope.timeoutContent = "";
    $scope.ajaxContent = "";

    $scope.clickAction = function() {
        $scope.clickContent += "Angular click\n";
    }

    document.getElementById('js-click').addEventListener('click', function() {
        $scope.clickContent += "JS click\n";
    });

    $scope.timeoutAction = function() {
        $timeout(function() {
            $scope.timeoutContent += "Angular timeout\n";
        }, 1000);
    };

    document.getElementById("js-timeout").addEventListener("click", function() {
         setTimeout(function() {
            $scope.timeoutContent += "JS timeout\n";
         }, 1000);
    });

    $scope.ajaxAction = function() {
        $http.get("test.com", {}).then(function() {
            $scope.ajaxContent += "Angular ajax success\n";
        }, function() {
            $scope.ajaxContent += "Angular ajax fail\n";
        });
    }

    document.getElementById("js-ajax").addEventListener("click", function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'test.com');
        xhr.send();

        xhr.addEventListener('load', function() {

        debugger;
          if (xhr.status != 200) {
            $scope.ajaxContent += "JS ajax success\n";
          } else {
            $scope.ajaxContent += "JS ajax fail\n";
          }
        });
    });

}]);