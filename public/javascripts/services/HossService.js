angular.module('yeti').factory('HossSvc', function($http, $log){
    $log.debug('hi there from hoss svc');
    var _baseUrl = 'http://localhost:3000/api/hoss';

    return {
        get : function(){       
            return $http.get(_baseUrl);
        },


        read : function(hossId) {
            return $http.get(_baseUrl + '/' + hossId);
        },

        update : function(hoss){ 
            var paramData = $.param({
                name: hoss.name,
                oliver: hoss.oliver,
                stewart: hoss.stewart,
                klepper: hoss.klepper,
                colbert: hoss.colbert,
                meyers: hoss.meyers,
                kimmel: hoss.kimmel
            });

            return $http({
                url: _baseUrl + '/' + hoss._id,
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        create : function(hoss){
            var paramData = $.param({
                name: hoss.name,
                oliver: hoss.oliver,
                stewart: hoss.stewart,
                klepper: hoss.klepper,
                colbert: hoss.colbert,
                meyers: hoss.meyers,
                kimmel: hoss.kimmel
            });

            return $http({
                url: _baseUrl,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        delete: function(hoss){
            return $http.delete(_baseUrl + '/' + hoss._id)
        }


    }
});