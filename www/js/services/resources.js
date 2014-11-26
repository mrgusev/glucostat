angular.module('glucostat.resources', [])
    .factory('Glucose', function (ResourceFactory) {
        return ResourceFactory.getCRUDService('glucose');
    })
    .factory('Insulin', function (ResourceFactory) {
        return ResourceFactory.getCRUDService('insulin');
    })
    .factory('Food', function($http, Config){
        return{
            searchFood: function(query, callback){
                $http.get(Config.serverHost + Config.apiPath + 'food/?search=' + query).success(callback);
            }
        }
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