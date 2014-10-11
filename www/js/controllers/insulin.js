angular.module('glucostat.controllers')
    .controller('InsulinCtrl', function($scope, $ionicModal, $ionicPopup, $filter, Insulin) {

        $ionicModal.fromTemplateUrl('templates/insulin-add-modal.html', function (modal) {
            $scope.createInsulinModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        });

        $scope.refreshData = function(){
            Insulin.getAll(function(data){
                $scope.insulins = [];
                var day;
                var currentDay;
                for (var i = 0; i < data.length; i++) {
                    day = $filter('date')(data[i].time, 'EEE dd.MM');
                    if (!_.contains(_.pluck($scope.insulins, 'day'), day)) {
                        currentDay = {day: day, values: []};
                        $scope.insulins.push(currentDay);
                    }
                    currentDay.values.push(data[i]);
                }
            })
        };

        $scope.refreshData();

        // Open our new modal
        $scope.newInsulin = function () {
            $scope.insulin = {
                value: '',
                type: 'short',
                time: new Date()
            };
            $scope.createInsulinModal.show().then(function(){
                cordova.plugins.Keyboard.show();
            });
        };

        $scope.closeNewInsulin = function(){
            $scope.createInsulinModal.hide();
        };

        $scope.createInsulin = function(){
            Insulin.add($scope.insulin, function(data){
                var currentDay;
                var day = $filter('date')(data.time, 'EEE dd.MM');
                if (!_.contains(_.pluck($scope.insulins, 'day'), day)) {
                    currentDay = {day: day, values: []};
                    $scope.insulins.unshift(currentDay);
                } else {
                    currentDay = _.findWhere($scope.insulins, {day: day});
                }
                currentDay.values.push(data);
                currentDay.values = _.sortBy(currentDay.values, function (item) {
                    return item.time
                }).reverse();
                $scope.createInsulinModal.hide();
            })
        };

        $scope.delete = function(ins){
            Insulin.delete(ins._id, function(){
                var day = $filter('date')(ins.time, 'EEE dd.MM');
                var currentDay = _.findWhere($scope.insulins, {day: day});
                currentDay.values.splice(currentDay.values.indexOf(ins), 1);
                if (currentDay.values.length == 0) {
                    $scope.insulins.splice($scope.insulins.indexOf(currentDay), 1);
                }
            });
        };


        $scope.openDatePicker = function() {
            $scope.tmp = {};
            $scope.tmp.newDate = $scope.insulin.time;

            var birthDatePopup = $ionicPopup.show({
                template: '<datetimepicker  datetimepicker-config="{startView: '+"'hour'"+'}" ng-model="tmp.newDate"></datetimepicker>',
                title: "Insulin Usage Time",
                scope: $scope,
                buttons: [
                    { text: 'OK' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            $scope.insulin.time = $scope.tmp.newDate;
                        }
                    }
                ]
            });
        }
    })
