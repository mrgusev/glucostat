angular.module('glucostat.resources.log', ['glucostat.config'])
.factory('Log', function($http, Config){
        return {
            getAll: function(callback){
                $http.get(Config.serverHost + Config.apiPath + 'log/').success(callback);
            },
            add: function(log, callback){
                $http.post(Config.serverHost + Config.apiPath + 'log/', log).success(function(data){
                    callback(data);
                });
            },
            getAverageGlucose: function(callback){
                $http.get(Config.serverHost + Config.apiPath + 'average/').success(callback);
            },
            remove: function(id, callback){
                $http.delete(Config.serverHost + Config.apiPath + 'log/'+id).success(callback);
            }
        }
    });