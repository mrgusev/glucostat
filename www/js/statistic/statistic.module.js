angular.module('glucostat.app.statistic', [])
    .config(function ($stateProvider) {
        $stateProvider.state(
            'statistic',
            {
                url: '/statistic',
                templateUrl: '/js/statistic/statistic.html',
                controller: 'StatisticCtrl'
            }
        );
    })
    .controller('StatisticCtrl', function ($scope) {

    });