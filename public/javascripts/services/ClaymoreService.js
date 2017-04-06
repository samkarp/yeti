angular.module('yeti', ['ui.router']).factory('ClaymoreSvc', function($http, $log){
    $log.debug('hi there from claymore svc');
    var _baseUrl = 'http://localhost:3000/api/claymore';

    return {
        get : function(){       
            return $http.get(_baseUrl);
        },

        read : function(){

        },

        update : function(product){ 
            var paramData = $.param({
                productTitle: product.productTitle,
                modelRunTime: product.modelRunTime,
                forecastId: product.forecastId,
                approvedBy: null,
                approved: false,
                approvedDate: null,
                lastModified: Date.now(),
                productLength: product.productLength,
                aois: product.aois
            });

            return $http({
                url: _baseUrl + product._id,
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        create : function(product){
            var paramData = $.param({
                productTitle: product.productTitle,
                modelRunTime: product.modelRunTime,
                forecastId: product.forecastId,
                approvedBy: null,
                approved: false,
                approvedDate: null,
                lastModified: Date.now(),
                productLength: product.productLength,
                aois: product.aois
            });
            
            return $http({
                url: _baseUrl,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        delete: function(product){
            return $http.delete(_baseUrl + product._id)
        }


    }
});