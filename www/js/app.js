// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('glucostat', [
    'ionic',
    'highcharts-ng',
    'glucostat.controllers',
    'glucostat.services',
    'glucostat.resources',
    'ui.bootstrap.datetimepicker'])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .run(function ($ionicPlatform, $ionicSideMenuDelegate, $rootScope, CacheService) {

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
        CacheService.preloadCache(function(){
            $rootScope.isChacheLoaded = true;
            console.log('All cache loaded.')
            $rootScope.refreshData();
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.glucose', {
                url: '/glucose',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/glucose.html',
                        controller: 'GlucoseCtrl'
                    }
                }
            })

            .state('tab.medicine', {
                url: '/medicine',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/insulin.html',
                        controller: 'InsulinCtrl'
                    }
                }
            })

            .state('tab.food', {
                url: '/food',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/food.html',
                        controller: 'FoodCtrl'
                    }
                }
            });

        $stateProvider.state('statistic', {
            url: '/statistic',
            templateUrl: 'templates/statistic.html',
            controller: 'StatisticCtrl'
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/glucose');

    });

