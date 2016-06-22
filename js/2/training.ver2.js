var module = angular.module('myApp', []);

module.controller('SimpleController', ['$scope', function ($scope) {

}]);

module.controller('trainingTabPanelController', ['$scope', function($scope){
    var ctrl = this,
        oldIndex;
    ctrl.tabs = [];

    ctrl.select = function(currentIndex, evt) {
        var previousTabIndex = findTabIndex(oldIndex);
        var previousSelected = ctrl.tabs[previousTabIndex];

        if (previousSelected) {
            previousSelected.tab.active = false;
        }

        var currentSelected = ctrl.tabs[currentIndex];
        if (currentSelected) {
            debugger;
            currentSelected.tab.onSelect({
                $event: evt
            });

            currentSelected.tab.active = true;
            ctrl.active = currentSelected.index;
            oldIndex = currentIndex;
        }
    }

    ctrl.addTab = function addTab(tab) {
        ctrl.tabs.push({
            tab: tab,
            index: tab.index
        });

        ctrl.tabs.sort(function(t1, t2) {
            if(t1.index > t2.index) {
                return 1;
            }

            if (t1.index < t2.index) {
                return -1;
            }

            return 0;
        });

        if(tab.index === ctrl.active || !angular.isDefined(ctrl.active) && ctrl.tabs.length === 1) {
            var newActiveIndex = findTabIndex(tab.index);
            ctrl.select(newActiveIndex);
        }
    };

    function findTabIndex(index)  {
        for(var i = 0; i < ctrl.tabs.length; i++) {
            if (ctrl.tabs[i].index === index) {
            return i;
            }
        }
    }

    $scope.$on("trainingTabPanel.active", function(val) {
        if (angular.isDefined(val) && val !== oldIndex) {
            ctrl.select(findTabIndex(val))
        }
    })
}]);

module.directive('trainingTabPanel', function () {

    return {
        scope: {},
        restrict: "E",
        replace: true,
        transclude: true,
        controller: 'trainingTabPanelController',
        controllerAs: 'trainingTabPanel',
        bindToController: { },
        link: function(scope, element, attrs) {
        },
        template: 
        '<div>' +
            '<ul class="nav nav-tabs" ng-transclude></ul>' +
            '<div class="tab-content">' + 
                '<div class="tab-pane" ng-repeat="tab in trainingTabPanel.tabs" ng-class="{active: trainingTabPanel.active === tab.index }" training-tab-content-transclude="tab">' +
                '</div>' +
            '</div>' +
        '</div>'
    }
});


module.directive('trainingTab', ['$parse', function () {

    return {
        require: '^trainingTabPanel',
        replace: true,
        transclude: true,
        scope: {
            heading: '@',
            index: '=?',
            classes: '@?',
            onSelect: "&select"
        },
        controller: function() {},
        controllerAs: 'trainingTab',
        link: function(scope, element, attrs, tabPanelCtrl, transclude) {
            if(angular.isUndefined(attrs.index)) {
                if(tabPanelCtrl.tabs && tabPanelCtrl.tabs.length) {
                    scope.index = Math.max.apply(null, tabPanelCtrl.tabs.map(function(t){ return t.index; })) + 1;
                } else {
                    scope.index = 0;
                }
            }

            if (angular.isUndefined(attrs.classes)) {
                scope.classes = '';
            }

            scope.select = function(evt) {
                var index;
                for(var i = 0; i < tabPanelCtrl.tabs.length; i++) {
                    if (tabPanelCtrl.tabs[i].tab === scope) {
                        index = i;
                        break;
                    }
                }

                tabPanelCtrl.select(index, evt);
            };

            tabPanelCtrl.addTab(scope);

            // This function is magic for me now
            scope.$transcludeFn = transclude;

        },
        template:
        '<li ng-class="[{active: active}, classes]" class="nav-item">' +
            '<a href ng-click="select($event)" class="nav-link" training-tab-heading-transclude>{{heading}}</a>' +
        '</li>'
        };
    }
]);

module.directive('trainingTabHeadingTransclude', function() {
    return {
        restrict: 'A',
        require: '^trainingTab',
        link: function(scope, element) {
            scope.$watch('headingElement', function udpateHeadingElement(heading) {
                if(heading) {
                    element.html('');
                    element.append(heading);
                }
            });
        }
    }
});

module.directive('trainingTabContentTransclude', function() {
    return {
        restrict: 'A',
        require: '^trainingTabPanel',
        link: function(scope, element, attrs) {
        debugger;
            var tab = scope.$eval(attrs.trainingTabContentTransclude).tab;

            // Magic from transclude function
            tab.$transcludeFn(tab.$parent, function(contents) {
                angular.forEach(contents, function(node){
                    if(isTabHeading(node)) {
                        tab.headingElement = node;
                    } else {
                        element.append(node);
                    }
                });
            });
        }
    }

    function isTabHeading(node) {
        return node.tagName && (
            node.tagName.toLowerCase() == 'training-tab-heading' ||
            node.hasAttribute('training-tab-heading'));
    }
});

module.controller('SimpleController', ['$scope', '$window', function($scope, $window) {
    debugger;
    $scope.alertMe = function () {
        setTimeout(function() {
            $window.alert('You\'ve selected the tab with callback');
        });
    }
}]);
