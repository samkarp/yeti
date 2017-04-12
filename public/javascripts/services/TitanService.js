angular.module('yeti').factory('TitanSvc', function($http, $log){
    $log.debug('hi there from titan svc');
    var _baseUrl = 'http://localhost:3000/api/titan';

    return {
        get : function(){       
            return $http.get(_baseUrl);
        },


        read : function(titanId) {
            return $http.get(_baseUrl + '/' + titanId);
        },

        update : function(titan){ 
            var paramData = $.param({
                marte: titan.marte,
                mccutchen: titan.mccutchen,
                cole: titan.cole,
                glasnow: titan.glasnow,
                freese: titan.freese,
                kang: titan.kang,
                name: titan.name
            });

            return $http({
                url: _baseUrl + '/' + titan._id,
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        create : function(titan){
            var paramData = $.param({
                marte: titan.marte,
                mccutchen: titan.mccutchen,
                cole: titan.cole,
                glasnow: titan.glasnow,
                freese: titan.freese,
                kang: titan.kang,
                name: titan.name
            });

            return $http({
                url: _baseUrl,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        delete: function(titan){
            return $http.delete(_baseUrl + '/' + titan._id)
        }


    }
});