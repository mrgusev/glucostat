angular.module('glucostat.controllers')
    .controller('StatisticCtrl', function ($scope, $ionicModal, $ionicPopup, $filter, Glucose) {

        $scope.chartConfig = {
            options: {
                exporting: { enabled: false },
                //This is the Main Highcharts chart config. Any Highchart options are valid here.
                //will be ovverriden by values specified below.

                chart: {
                    type: 'spline',
                    zoomType: 'x',
                    resetZoomButton:{
                        theme: {display: 'none'}
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0
                },
                plotOptions: {
                    spline: {
                        lineWidth: 4,
                        states: {
                            hover: {
                                lineWidth: 5
                            }
                        },
                        marker: {
                            enabled: true
                        }
                    }
                },
            },
            title: 'qw',

            xAxis: {
                type: 'datetime',
//                        dateTimeLabelFormats: {
//                            minute: '%H:%M',
//                            hour: '%H:%M',
//                            day: '%e. %b'
//                        },
                title: {
                    text: ''
                }
            },
            loading: true,

            series: [{
                data: [],
                name: 'Glucose'
            }],

            //function (optional)
            func: function (chart) {
                chart.xAxis[0].setExtremes(moment().subtract(1, 'days').format('X') * 1000, (new Date()).getTime());
//                chart.resetZoomButton.theme.display = 'none';
//                this.showResetZoom();
            }
        };
        Glucose.getAll(function (data) {
            var seriesData = [];
            data.reverse().forEach(function(item){
                seriesData.push([( new Date(item.time)).getTime(), item.value]);
            });
            $scope.chartConfig.series[0].data = seriesData;
            $scope.chartConfig.loading = false;

        })
    });