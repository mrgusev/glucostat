angular.module('glucostat.services')
    .factory('TimeListService', function ($rootScope, $ionicModal, $ionicPopup, $filter, ResourceFactory) {

        return function (entity, scope) {
            var Resource = ResourceFactory.getCRUDService(entity);
            $ionicModal.fromTemplateUrl('templates/' + entity + '-add-modal.html', function (modal) {
                scope.newItemModal = modal;
            }, {
                scope: scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            });

            $rootScope.refreshData = scope.refreshData = function () {
                if($rootScope.isChacheLoaded){
                    console.log('Fetching from cache: '+entity);
                    Resource.getAll(function (data) {
                        scope.items = [];
                        var day;
                        var currentDay;
                        for (var i = 0; i < data.length; i++) {
                            day = $filter('date')(data[i].time, 'EEE dd.MM');
                            if (!_.contains(_.pluck(scope.items, 'day'), day)) {
                                currentDay = {day: day, values: []};
                                scope.items.push(currentDay);
                            }
                            currentDay.values.push(data[i]);
                        }
                    })
                }
            };

            scope.refreshData();

            // Open our new modal
            scope.openItemModal = function () {
                scope.newItem = scope.newItemDefaults ? scope.newItemDefaults() : {time: new Date()};

                scope.newItemModal.show().then(function () {
                    cordova.plugins.Keyboard.show();
                });
            };

            scope.closeItemModal = function () {
                scope.newItemModal.hide();
            };

            scope.createNewItem = function () {
                Resource.add(scope.newItem, function (data) {
                    var currentDay;
                    var day = $filter('date')(data.time, 'EEE dd.MM');
                    if (!_.contains(_.pluck(scope.items, 'day'), day)) {
                        currentDay = {day: day, values: []};
                        scope.items.unshift(currentDay);
                    } else {
                        currentDay = _.findWhere(scope.items, {day: day});
                    }
                    currentDay.values.push(data);
                    currentDay.values = _.sortBy(currentDay.values, function (item) {
                        return item.time
                    }).reverse();
                    scope.newItemModal.hide();
                })
            };

            scope.delete = function (item) {
                Resource.delete(item._id, function () {
                    var day = $filter('date')(item.time, 'EEE dd.MM');
                    var currentDay = _.findWhere(scope.items, {day: day});
                    currentDay.values.splice(currentDay.values.indexOf(item), 1);
                    if (currentDay.values.length == 0) {
                        scope.items.splice(scope.items.indexOf(currentDay), 1);
                    }
                });
            };

            scope.openDatePicker = function () {
                scope.tmp = {};
                scope.tmp.newDate = scope.newItem.time;

                var birthDatePopup = $ionicPopup.show({
                    template: '<datetimepicker  datetimepicker-config="{startView: ' + "'hour'" + '}" ng-model="tmp.newDate"></datetimepicker>',
                    title: "Measurement time",
                    scope: scope,
                    buttons: [
                        { text: 'Cancel' },
                        {
                            text: '<b>OK</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                scope.newItem.time = scope.tmp.newDate;
                            }
                        }
                    ]
                });
            }
        };


    });
