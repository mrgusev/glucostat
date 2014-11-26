angular.module('glucostat.config', [])
.factory('Config', function(){
        return {
            //serverHost: 'http://localhost:8081/',
            serverHost: 'http://glucostat.herokuapp.com/',
            apiPath: 'api/'
        };
    });