angular.module('glucostat.app.statistic', [
    'glucostat.resources.log'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('statistic', {
                url: '/statistic',
                abstract: true,
                templateUrl: 'js/statistic/statistic.html'
            })
            .state('statistic.glucose-common', {
                url: '',
                views: {
                    'glucose-common': {
                        templateUrl: 'js/statistic/glucose-common.html',
                        controller: 'StatisticCtrl'
                    }
                }
            });

    })
    .controller('StatisticCtrl', function ($scope, $timeout, Log) {
        $scope.filter = 'w';
        $scope.total = '-';
        $scope.high = '-';
        $scope.low = '-';
        $scope.normal = '-';
        $scope.updateStatistic = function () {
            Log.getGlucoseProportions($scope.filter, function (data) {
                $scope.high = Math.round(data.countHigh / data.total * 100);
                $scope.low = Math.round(data.countLow / data.total * 100);
                $scope.normal = Math.round(data.countNormal / data.total * 100);
                $scope.total = data.total;
                $scope.chartConfig = {
                    id: 'chart1',

                    options: {
                        exporting: {enabled: false},
                        credits: false,
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            height: '180',
                            //width: '150',
                            margin: [0, 0, 0, 0],
                            spacingTop: 0,
                            spacingBottom: 0,
                            spacingLeft: 0,
                            spacingRight: 0
                        },
                        title: {
                            //text: 'Browser market shares at a specific website, 2014'
                        },
                        tooltip: {
                            enable: false
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: false,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: false
                            }
                        }
                    },
                    title: 'qw',
                    //loading: true,
                    series: [{
                        animation: false,
                        type: 'pie',
                        name: 'Browser share',
                        data: [
                            {name: 'High', y: $scope.high, color: '#8a6de9'},
                            {name: 'Low', y: $scope.low, color: '#ef4e3a'},
                            {name: 'Normal', y: $scope.normal, color: '#66cc33'}
                        ]
                    }]
                };
            });
        };

        $scope.setFilter = function (range) {
            $scope.filter  = range;
            $scope.updateStatistic();
        };

        $scope.updateStatistic();
    });