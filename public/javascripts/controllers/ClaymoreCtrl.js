angular.module('yeti').controller("ClaymoreCtrl", function ($scope, $window, $http, ClaymoreSvc, $log) {
        $log.debug('hi there claymore ctrl file man');
        $scope.model = {};

        ClaymoreSvc.get().then(function(res){
                $scope.model["claymores"] = res.data;   
        });

        $scope.editClaymore = function (claymore) {
            $scope.reset();
            $scope.model.selected = angular.copy(claymore);
        };

        $scope.saveClaymore = function (idx) {
            console.log("Saving Claymore");
            //POST HERE the $scope.model.selected

            ClaymoreSvc.update($scope.model.selected)
                .success(function(data, status, headers, config){
                    $scope.model.claymores[idx] = angular.copy($scope.model.selected);
                    $scope.reset();
                    console.log("got it");
                })
                .error(function(data, status, header, config){
                //TODO Do something here for errors -- toast message + leave text in inputs
                    console.log('error me here');
                });
        };

        $scope.addClaymore = function () {
            console.log("Adding Claymore");
            ClaymoreSvc.create($scope.model.claymores, $scope.model.selected)
                .success(function(data, status, headers, config){
                    //Give it the ID of the mongo db
                    $scope.model.selected._id = data._id
                    $scope.model.claymores.push(angular.copy($scope.model.selected));
                    $scope.reset();
                })
                .error(function(data, status, header, config){
                    console.log("unable to add row of claymore data")
                });
        };

        $scope.removeClaymore = function (claymore) {
            var confirmRemove = $window.confirm("Are you sure you want to delete this claymore?");
            if (confirmRemove){
                console.log("Removing Claymore");
                ClaymoreSvc.delete(claymore)
                    .success(function(data,status){
                        $scope.model.claymores.splice($scope.model.claymores.indexOf(claymore),1);
                        $scope.reset();
                    })
                    .error(function(data,status){
                        console.log("Unable to delete claymore with ID: " + claymore._id);
                    });

            }
        };

        $scope.reset = function () {
            $scope.model.selected = {};
        };
    });