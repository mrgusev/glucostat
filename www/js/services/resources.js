angular.module('glucostat.resources', [])
    .factory('Glucose', function (ResourceFactory) {
        return ResourceFactory.getCRUDService('glucose');
    })
    .factory('Insulin', function (ResourceFactory) {
        return ResourceFactory.getCRUDService('insulin');
    })
    .factory('CacheService', function(Glucose, Insulin){
        return {
            preloadCache: function(callback){
                Glucose.updateCache(function(){
                    Insulin.updateCache(function(){
                        callback();
                    })
                })
            }
        }
    });