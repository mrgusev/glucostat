angular.module('glucostat.services')
    .factory('ResourceFactory', function ($http, Config) {
        return{
            getCRUDService: function (entityName) {
                return {
                    getAll: function (callback) {
                        var cache = window.localStorage.cache ? JSON.parse(window.localStorage.cache) : {};
                        if(cache && cache[entityName]){
                            callback(cache[entityName].entities);
                            $http.get(Config.serverHost + '/api/' + entityName + '/').success(function(data){
                                cache[entityName] = {
                                    entities: data,
                                    time: new Date()
                                };
                                window.localStorage.cache = JSON.stringify(cache);
                            });
                        } else{
                            $http.get(Config.serverHost + '/api/' + entityName + '/').success(function(data){
                                cache[entityName] = {
                                    entities: data,
                                    time: new Date()
                                };
                                window.localStorage.cache = JSON.stringify(cache);
                                callback(data);
                            });
                        }
                    },
                    getById: function (id, callback) {
                        $http.get(Config.serverHost + '/api/' + entityName + '/' + id).success(callback);
                    },
                    add: function (entity, callback) {
                        $http.post(Config.serverHost + '/api/' + entityName + '/', entity).success(callback);
                    },
                    'delete': function (id, callback) {
                        $http.delete(Config.serverHost + '/api/' + entityName + '/' + id).success(callback)
                    },
                    update: function (entity, callback) {
                        $http.post(Config.serverHost + '/api/' + entityName + '/' + entity.id, entity).success(callback);
                    }
                }
            }
        }
    });