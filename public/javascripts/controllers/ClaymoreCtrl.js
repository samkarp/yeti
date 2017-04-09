angular.module('yeti').controller("ClaymoreCtrl", function ($scope, $window, $http, ClaymoreSvc, $log, $stateParams, $state) {
        $log.debug('hi there claymore ctrl file man');
        $scope.model = {};

        ClaymoreSvc.get().then(function(res){
                $scope.claymores = res.data;   
        });

       if ($stateParams.claymoreId) {
            console.log($stateParams.claymoreId);
            ClaymoreSvc.read($stateParams.claymoreId).then(function(res){
                $scope.claymore = res.data;
            })
        };

        $scope.saveClaymore = function (claymore) {
            console.log("Saving Claymore");
            //POST HERE the $scope.model.selected

            ClaymoreSvc.update($scope.claymore)
                .then(function(response){
                    $state.go('yeti.claymore');
                })
                .catch(function(data){
                //TODO Do something here for errors -- toast message + leave text in inputs
                    console.log('error me here');
                    console.log(data.status);
                });
        };

        $scope.addClaymore = function () {
            console.log("Adding Claymore");
            ClaymoreSvc.create($scope.claymore)
                .then(function(response){
                    $state.go('yeti.claymore');
                })
                .catch(function(data){
                    console.log("unable to add row of claymore data")
                    console.log(data.status);
                });
        };

        $scope.removeClaymore = function (claymore) {
            var confirmRemove = $window.confirm("Are you sure you want to delete this claymore?");
            if (confirmRemove){
                console.log("Removing Claymore");
                ClaymoreSvc.delete($scope.claymore)
                    .then(function(response){
                        $scope.reset();
                        $state.go('yeti.claymore');

                    })
                    .catch(function(data){
                        console.log("Unable to delete claymore with ID: " + claymore._id);
                        console.log(data.status);
                    });

            }
        };

        $scope.reset = function () {
            $scope.claymore = null;
            $state.go('yeti.claymore');
        };
    });