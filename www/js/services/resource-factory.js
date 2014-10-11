angular.module('glucostat.services')
    .factory('ResourceFactory', function ($http, Config) {
        return{
            getCRUDService: function (entityName) {
                return {
                    updateCache: function(callback){
                        $http.get(Config.serverHost + '/api/' + entityName + '/').success(function(data){
                            var cache = {
                                entities: data,
                                time: new Date()
                            };
                            window.localStorage[entityName] = JSON.stringify(cache);
                            console.log('Cache updated for: '+entityName);

                            callback();
                        });
                    },
                    getAll: function (callback) {
                        var cache = JSON.parse(window.localStorage[entityName]);
                        callback(cache.entities);
                    },
                    getById: function (id, callback) {
                        $http.get(Config.serverHost + '/api/' + entityName + '/' + id).success(callback);
                    },
                    add: function (entity, callback) {
                        $http.post(Config.serverHost + '/api/' + entityName + '/', entity).success(function(data){
                            var cache =  JSON.parse(window.localStorage[entityName]);
                            cache.entities.push(data);
                            cache.entities = _.sortBy(cache.entities, function(item){return item.time}).reverse();
                            window.localStorage[entityName] = JSON.stringify(cache);
                            callback(data);
                        });
                    },
                    'delete': function (id, callback) {
                        var cache =  JSON.parse(window.localStorage[entityName]);
                        var collection = cache.entities;
                        collection.splice(collection.indexOf(_.findWhere(collection, {_id: id})), 1);
                        window.localStorage[entityName] = JSON.stringify(cache);
                        $http.delete(Config.serverHost + '/api/' + entityName + '/' + id).success(callback)
                    },
                    update: function (entity, callback) {
                        $http.post(Config.serverHost + '/api/' + entityName + '/' + entity.id, entity).success(callback);
                    }
                }
            }
        }
    });