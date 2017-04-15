angular.module('yeti', ['ui.router', 'datatables', 'datatables.bootstrap']).factory('ClaymoreSvc', function($http, $log){
    $log.debug('hi there from claymore svc');
    var _baseUrl = 'http://localhost:3000/api/claymore';

    return {
        get : function(){       
            return $http.get(_baseUrl);
        },


        read : function(claymoreId) {
            return $http.get(_baseUrl + '/' + claymoreId);
        },

        update : function(claymore){ 
            var paramData = $.param({
                name: claymore.name,
                breed: claymore.breed,
                cuteness: claymore.cuteness,
                smell: claymore.smell,
                color: claymore.color,
                agressiveness: claymore.agressiveness,
                food: claymore.food,
                bestInShow: claymore.bestInShow,
                akcDogRanking: claymore.akcDogRanking,
                personality: claymore.personality,
                registerYear: claymore.registerYear,
                colors: claymore.colors
            });

            return $http({
                url: _baseUrl + '/' + claymore._id,
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        create : function(claymore){
            var paramData = $.param({
                name: claymore.name,
                breed: claymore.breed,
                cuteness: claymore.cuteness,
                smell: claymore.smell,
                color: claymore.color,
                agressiveness: claymore.agressiveness,
                food: claymore.food,
                bestInShow: claymore.bestInShow,
                akcDogRanking: claymore.akcDogRanking,
                personality: claymore.personality,
                registerYear: claymore.registerYear,
                colors: claymore.colors
            });

            return $http({
                url: _baseUrl,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: paramData
            });
        },

        delete: function(claymore){
            return $http.delete(_baseUrl + '/' +claymore._id)
        }


    }
});