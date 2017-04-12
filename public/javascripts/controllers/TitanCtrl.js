angular.module('yeti').controller("TitanCtrl", function ($scope, $window, $http, TitanSvc, $log, $stateParams, $state) {
        $log.debug('hi there titan ctrl file man');
        $scope.model = {};

        TitanSvc.get().then(function(res){
                $scope.titans = res.data;   
        });

       if ($stateParams.titanId) {
            console.log($stateParams.titanId);
            TitanSvc.read($stateParams.titanId).then(function(res){
                $scope.titan = res.data;
            })
        };

        $scope.saveTitan = function (titan) {
            console.log("Saving Titan");
            //POST HERE the $scope.model.selected

            TitanSvc.update($scope.titan)
                .then(function(response){
                    $state.go('yeti.titan');
                })
                .catch(function(data){
                //TODO Do something here for errors -- toast message + leave text in inputs
                    console.log('error me here');
                    console.log(data.status);
                });
        };

        $scope.addTitan = function () {
            console.log("Adding Titan");
            console.log($scope.titan);
            TitanSvc.create($scope.titan)
                .then(function(response){
                    $state.go('yeti.titan');
                })
                .catch(function(data){
                    console.log("unable to add row of titan data")
                    console.log(data.status);
                });
        };

        $scope.removeTitan = function (titan) {
            var confirmRemove = $window.confirm("Are you sure you want to delete this titan?");
            if (confirmRemove){
                console.log("Removing Titan");
                TitanSvc.delete($scope.titan)
                    .then(function(response){
                        $scope.reset();
                        $state.go('yeti.titan');
                    })
                    .catch(function(data){
                        console.log("Unable to delete titan with ID: " + titan._id);
                        console.log(data.status);
                    });
            }
        };

        $scope.reset = function () {
            $scope.titan = null;
            $state.go('yeti.titan');
        };
    });