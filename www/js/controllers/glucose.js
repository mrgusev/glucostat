angular.module('glucostat.controllers')
    .controller('GlucoseCtrl', function ($scope, $ionicModal, $ionicPopup, $filter, Glucose) {

        $ionicModal.fromTemplateUrl('templates/glucose-add-modal.html', function (modal) {
            $scope.createGlucModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        });

        $scope.refreshData = function () {
            Glucose.getAll(function (data) {
                $scope.glucs = [];
                var day;
                var currentDay;
                for (var i = 0; i < data.length; i++) {
                    day = $filter('date')(data[i].time, 'EEE dd.MM');
                    if (!_.contains(_.pluck($scope.glucs, 'day'), day)) {
                        currentDay = {day: day, values: []};
                        $scope.glucs.push(currentDay);
                    }
                    currentDay.values.push(data[i]);
                }
            })
        };

        $scope.refreshData();

        // Open our new modal
        $scope.newGluc = function () {
            $scope.glucose = {
                value: '',
                time: new Date()
            };
            $scope.createGlucModal.show().then(function () {
                cordova.plugins.Keyboard.show();
            });
        };

        $scope.closeNewGluc = function () {
            $scope.createGlucModal.hide();
        };

        $scope.createGlucose = function () {
            Glucose.add($scope.glucose, function (data) {
                var currentDay;
                var day = $filter('date')(data.time, 'EEE dd.MM');
                if (!_.contains(_.pluck($scope.glucs, 'day'), day)) {
                    currentDay = {day: day, values: []};
                    $scope.glucs.unshift(currentDay);
                } else {
                    currentDay = _.findWhere($scope.glucs, {day: day});
                }
                currentDay.values.push(data);
                currentDay.values = _.sortBy(currentDay.values, function (item) {
                    return item.time
                }).reverse();
                $scope.createGlucModal.hide();
            })
        };

        $scope.delete = function (glucose) {
            Glucose.delete(glucose._id, function () {
                var day = $filter('date')(glucose.time, 'EEE dd.MM');
                var currentDay = _.findWhere($scope.glucs, {day: day});
                currentDay.values.splice(currentDay.values.indexOf(glucose), 1);
                if (currentDay.values.length == 0) {
                    $scope.glucs.splice($scope.glucs.indexOf(currentDay), 1);
                }
            });
        };

        $scope.openDatePicker = function () {
            $scope.tmp = {};
            $scope.tmp.newDate = $scope.glucose.time;

            var birthDatePopup = $ionicPopup.show({
                template: '<datetimepicker  datetimepicker-config="{startView: ' + "'hour'" + '}" ng-model="tmp.newDate"></datetimepicker>',
                title: "Measurement time",
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $scope.glucose.time = $scope.tmp.newDate;
                        }
                    }
                ]
            });
        }
    });
