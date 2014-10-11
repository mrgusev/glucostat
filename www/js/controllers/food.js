angular.module('glucostat.controllers')
    .controller('FoodCtrl', function($scope, TimeListService) {
        TimeListService('food', $scope);
    });
