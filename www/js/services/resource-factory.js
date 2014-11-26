var cacheStorage = {};
angular.module('glucostat.services')
    .factory('ResourceFactory', function ($http, Config) {
        return{
            getCRUDService: function (entityName) {
                if(entityName == 'food'){
                    return{
                        getAll: function(callback){
                            callback([
                                {
                                    _id: 1,
                                    time: "2014-10-26T04:30:07.703Z",
                                    carbs: '31',
                                    type: 'Breakfast'
                                }
                            ])
                        }
                    }
                }
                return {
                    updateCache: function(callback){
                        $http.get(Config.serverHost + Config.apiPath + entityName + '/').success(function(data){
                            cacheStorage[entityName] = {
                                entities: data,
                                time: new Date()
                            };
                            console.log('Cache updated for: '+ entityName);

                            callback();
                        });
                    },
                    getAll: function (callback) {
                        callback(cacheStorage[entityName].entities.slice(0,20));
                    },
                    getStatistic: function(callback){
                        callback(cacheStorage[entityName].entities)
                    },
                    getById: function (id, callback) {
                        $http.get(Config.serverHost + Config.apiPath + entityName + '/' + id).success(callback);
                    },
                    add: function (entity, callback) {
                        $http.post(Config.serverHost + Config.apiPath + entityName + '/', entity).success(function(data){
                            var cache =  cacheStorage[entityName];
                            cache.entities.push(data);
                            cache.entities = _.sortBy(cache.entities, function(item){return item.time}).reverse();
                            callback(data);
                        });
                    },
                    'delete': function (id, callback) {
                        var cache =  cacheStorage[entityName];
                        var collection = cache.entities;
                        collection.splice(collection.indexOf(_.findWhere(collection, {_id: id})), 1);
//                        window.localStorage[entityName] = JSON.stringify(cache);
                        $http.delete(Config.serverHost + Config.apiPath + entityName + '/' + id).success(callback)
                    },
                    update: function (entity, callback) {
                        $http.post(Config.serverHost + Config.apiPath + entityName + '/' + entity.id, entity).success(callback);
                    }
                }
            }
        }
    });