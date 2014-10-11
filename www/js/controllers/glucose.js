angular.module('glucostat.controllers')
    .controller('GlucoseCtrl', function ($scope, TimeListService) {
        $scope.newItemDefaults = function(){
            return{
                time: new Date()
            }
        };
        TimeListService('glucose', $scope);
    });
