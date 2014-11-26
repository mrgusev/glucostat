angular.module('glucostat.filters', ['glucostat.services'])
    .filter('breadUnit', function (Settings) {
        return function (carbs) {
            return Math.round(carbs / Settings.carbsPerBreadUnit * 10) / 10;
        }
    });