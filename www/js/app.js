// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('glucostat.app', [
    'ionic',
    'highcharts-ng',
    'ui.bootstrap.datetimepicker',
    'glucostat.app.home',
    'glucostat.app.history',
    'glucostat.app.statistic'
])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .run(function ($ionicPlatform, $ionicSideMenuDelegate, $rootScope) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                        .then(function (result) {
                            if (!result) {
                                ionic.Platform.exitApp();
                            }
                        });
                }
            }
        });

        $rootScope.toggleMenu = function(){
            $ionicSideMenuDelegate.toggleLeft();
        };

        //CacheService.preloadCache(function(){
        //    $rootScope.isChacheLoaded = true;
        //    console.log('All cache loaded.');
        //    $rootScope.refreshData();
        //});
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    });

