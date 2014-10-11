angular.module('glucostat.resources', [])
    .factory('Glucose', function (ResourceFactory) {
        return ResourceFactory.getCRUDService('glucose');
    })
    .factory('Insulin', function (ResourceFactory) {
        return ResourceFactory.getCRUDService('insulin');
    });