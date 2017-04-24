angular.module('yeti').directive('chosen', function(){
        var linker = function(scope, element, attr){
            scope.$watch('availableHoss', function(){
                element.triggerHandler('chosen:updated');
            });

            scope.$watch('hossGroupBy', function(){
                element.triggerHandler('chosen:updated');
            });

            element.chosen({width: "95%"});
        };
        return {
            restrict: 'A',
            link: linker
        }
    }); 