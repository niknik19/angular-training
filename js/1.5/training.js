var module = angular.module('myApp', []);

module.controller("SimpleController", ["$scope", function ($scope) {

}]);

module.directive("modalWindow", function () {

    return {
        scope: {
            modalWindowTitle: "<title",
            modalWindowActionHandler: "&actionCallback"
        },
        restrict: "E",
        transclude: true,
        link: function(scope, iElement, iAttrs, controller) {
            
        },
        controller: function($scope, $element, $attrs, $transclude){
            $scope.innerModalWindowActionHandler = function($event) {
                $scope.modalWindowActionHandler({event: $event, sender: $event.target});
                return false;
            }
        },
        template: 
"<!-- Button trigger modal -->" +
"<button type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal'>" +
"Click Me" + 
"</button>" +
'<!-- Modal -->'+
'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
  '<div class="modal-dialog" role="document">'+
    '<div class="modal-content">'+
      '<div class="modal-header">'+
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
        '<h4 class="modal-title" id="myModalLabel">{{ modalWindowTitle }}</h4>'+
      '</div>'+
      '<div class="modal-body">'+
      '<ng-transclude />' +
      '</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
        '<button type="button" class="btn btn-primary" ng-click="modalWindowActionHandler({event: $event })">OK</button>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>' 
    };

});

module.run(["$rootScope", function ($rootScope) {
    $rootScope.doSomeMagic = function () {
        console.log("Some magic to console");
    };
    
    $rootScope.modalWindowTitle = "Some Window Title";
    
    $rootScope.modalWindowActionHandler = function(event, sender) {
        console.log("Modal Window Action Handler", event, sender);
        return false;
    }
}]);