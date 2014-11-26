angular.module('glucostat.app.log', [
    'glucostat.resources.log'
])
.service('LogService', function( $ionicModal, $ionicPopup, $filter, Log){
        return function(scope){

            $ionicModal.fromTemplateUrl('js/home/modal-add-glucose.html', function (modal) {
                scope.newItemModal = modal;
                scope.newItem = scope.newItemDefaults ? scope.newItemDefaults() : {time: new Date()};
                scope.newItem.type = 'glucose';
            }, {
                scope: scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            });

            scope.openAddModal = function (type) {

            };

            scope.closeItemModal = function () {
                scope.newItemModal.hide();
            };

            scope.createNewItem = function () {
                console.log(JSON.stringify(scope.newItem));
                Log.add(scope.newItem, function (data) {
                    scope.newItemModal.hide();
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
                        {text: 'Cancel'},
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
        }
    });