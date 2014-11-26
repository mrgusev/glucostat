angular.module('glucostat.app.history', [])
    .config(function ($stateProvider) {
        $stateProvider.state(
            'history',
            {
                url: '/history',
                templateUrl: 'js/history/history.html',
                controller: 'HistoryCtrl'
            }
        );
    })
    .controller('HistoryCtrl', function ($scope, $filter, Log) {
        Log.getAll(function(data){
            $scope.items = [];
            var day;
            var currentDay;
            for (var i = 0; i < data.length; i++) {
                day = $filter('date')(data[i].time, 'EEE dd.MM');
                if (!_.contains(_.pluck($scope.items, 'day'), day)) {
                    currentDay = {day: day, logs: []};
                    $scope.items.push(currentDay);
                }
                currentDay.logs.push(data[i]);
            }
        });

        $scope.deleteItem = function(item){
            Log.remove(item._id);
            var day = $filter('date')(item.time, 'EEE dd.MM');
            var currentDay = _.findWhere($scope.items, {day: day});
            currentDay.logs.splice(currentDay.logs.indexOf(item), 1);
            if (currentDay.logs.length == 0) {
                $scope.items.splice($scope.items.indexOf(currentDay), 1);
            }

        };
    });