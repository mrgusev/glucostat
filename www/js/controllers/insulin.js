angular.module('glucostat.controllers')
    .controller('InsulinCtrl', function($scope, TimeListService) {
        $scope.newItemDefaults = function(){
            return{
                time: new Date(),
                type: 'short'
            }
        };
        TimeListService('insulin', $scope);
    });
