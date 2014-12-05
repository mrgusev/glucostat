angular.module('glucostat.app.home', [
    'glucostat.resources.log'
])
    .config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'js/home/home.html',
            controller: 'HomeCtrl'
        });
    })
    .controller('HomeCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, Log) {

        $scope.averageGlucose = {
            avgGlucose: '-',
            totalGlucs: '-'
        };
        Log.getAverageGlucose('w', function (data) {
            data.avgGlucose = Math.round(data.avgGlucose * 10) / 10;
            $scope.averageGlucose = data;
        });


        $scope.openAddModal = function (type) {
            $ionicModal.fromTemplateUrl('js/home/modal-add-' + type + '.html', function (modal) {
                $scope.newItemModal = modal;
                $scope.newItem = $scope.newItemDefaults ? $scope.newItemDefaults() : {time: new Date()};
                $scope.newItem.type = type;
                $scope.newItemModal.show().then(function () {
                    $timeout(function(){
                        cordova.plugins.Keyboard.show();
                    });
                });
            }, {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            });
        };

        $scope.closeItemModal = function () {
            $scope.newItemModal.hide().then(function(){
                cordova.plugins.Keyboard.close();
            });
        };

        $scope.createNewItem = function () {
            Log.add($scope.newItem, function (data) {
                $scope.newItemModal.hide();
            });
        };

        $scope.openDatePicker = function () {
            $scope.tmp = {};
            $scope.tmp.newDate = $scope.newItem.time;

            var birthDatePopup = $ionicPopup.show({
                template: '<datetimepicker  datetimepicker-config="{startView: ' + "'hour'" + '}" ng-model="tmp.newDate"></datetimepicker>',
                title: "Measurement time",
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $scope.newItem.time = $scope.tmp.newDate;
                        }
                    }
                ]
            });
        }
    });