angular.module('yeti').factory('OrabelleSvc', function($http, $log){
    $log.debug('hi there from orabelle svc');
    var _baseUrl = 'http://localhost:3000/api/orabelle';

    return {
        get : function(){       
            return $http.get(_baseUrl);
        },


        read : function(orabelleId) {
            return $http.get(_baseUrl + '/' + orabelleId);
        },

        update : function(orabelle){ 
            var paramData = $.param({
                name: orabelle.name,
                ibu: orabelle.ibu,
                abv: orabelle.abv,
                brand: orabelle.brand,
                price: orabelle.price,
                aroma: orabelle.aroma,
                bitterness: orabelle.bitterness
            });

            return $http({
                url: _baseUrl + '/' + orabelle._id,
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        create : function(orabelle){
            var paramData = $.param({
                name: orabelle.name,
                ibu: orabelle.ibu,
                abv: orabelle.abv,
                brand: orabelle.brand,
                price: orabelle.price,
                aroma: orabelle.aroma,
                bitterness: orabelle.bitterness
            });

            return $http({
                url: _baseUrl,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        delete: function(orabelle){
            return $http.delete(_baseUrl + '/' + orabelle._id)
        }


    }
});