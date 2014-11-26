angular.module('glucostat.controllers')
.controller('CalculatorCtrl', function($scope, $timeout, Food){
        $scope.searchQuery = '';
        var filterText = '';
        var tempFilterText = '', filterTextTimeout;

        $scope.clearSearch = function(){
            $scope.searchQuery = '';
        };

        $scope.$watch('searchQuery',function(val){
            if ($scope.searchQuery && $scope.searchQuery.length > 2) {
                if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
                tempFilterText = val;
                filterTextTimeout = $timeout(function () {
                    filterText = tempFilterText;
                    Food.searchFood($scope.searchQuery, function(data){
                        $scope.searchResults = data;
                    });
                }, 500);
            } else{
                $scope.products = [];
            }
        });

    });