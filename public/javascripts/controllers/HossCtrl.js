angular.module('yeti').controller("HossCtrl", function ($scope, $window, $http, HossSvc, $log, $stateParams, $state) {
        $log.debug('hi there hoss ctrl file man');
        $scope.model = {};

        HossSvc.get().then(function(res){
                $scope.hosses = res.data;   
        });

       if ($stateParams.hossId) {
            console.log($stateParams.hossId);
            HossSvc.read($stateParams.hossId).then(function(res){
                $scope.hoss = res.data;
            })
        };

        $scope.saveHoss = function (hoss) {
            console.log("Saving Orabelle");
            //POST HERE the $scope.model.selected

            HossSvc.update($scope.hoss)
                .then(function(response){
                    $state.go('yeti.hoss');
                })
                .catch(function(data){
                //TODO Do something here for errors -- toast message + leave text in inputs
                    console.log('error me here');
                    console.log(data.status);
                });
        };

        $scope.addHoss = function () {
            console.log("Adding Hoss");
            console.log($scope.hoss);
            HossSvc.create($scope.hoss)
                .then(function(response){
                    $state.go('yeti.hoss');
                })
                .catch(function(data){
                    console.log("unable to add row of hoss data")
                    console.log(data.status);
                });
        };

        $scope.removeHoss = function (hoss) {
            var confirmRemove = $window.confirm("Are you sure you want to delete this hoss?");
            if (confirmRemove){
                console.log("Removing Hoss");
                HossSvc.delete($scope.hoss)
                    .then(function(response){
                        $scope.reset();
                        $state.go('yeti.hoss');
                    })
                    .catch(function(data){
                        console.log("Unable to delete hoss with ID: " + hoss._id);
                        console.log(data.status);
                    });
            }
        };

        $scope.reset = function () {
            $scope.hoss = null;
            $state.go('yeti.hoss');
        };
    });