angular.module('yeti').controller("OrabelleCtrl", function ($scope, $window, $http, OrabelleSvc, $log, $stateParams, $state, HossSvc) {
        $log.debug('hi there orabelle ctrl file man');
        $scope.model = {};
        $scope.dtOptions = {"paging": false, "order":[1, 'desc'], 'bInfo': false};
        $scope.hossGroupByOptions = ['colbert','meyers'];
        $scope.hossGroupBy = 'colbert';

        OrabelleSvc.get().then(function(res){
                $scope.orabelles = res.data;   
        });

        HossSvc.getSkinny().then(function(res){
            $scope.availableHoss = res.data;
        });

       if ($stateParams.orabelleId) {
            console.log($stateParams.orabelleId);
            OrabelleSvc.read($stateParams.orabelleId).then(function(res){
                $scope.orabelle = res.data;
            })
        };

        $scope.getTemplate = function () {
            console.log($scope.hossGroupBy);
            if ($scope.hossGroupBy == "colbert") return 'colbert';
            else return 'meyers';
        };

        $scope.saveOrabelle = function (orabelle) {
            console.log("Saving Orabelle");
            //POST HERE the $scope.model.selected

            OrabelleSvc.update($scope.orabelle)
                .then(function(response){
                    $state.go('yeti.orabelle');
                })
                .catch(function(data){
                //TODO Do something here for errors -- toast message + leave text in inputs
                    console.log('error me here');
                    console.log(data.status);
                });
        };

        $scope.addOrabelle = function () {
            console.log("Adding Orabelle");
            console.log($scope.orabelle);
            OrabelleSvc.create($scope.orabelle)
                .then(function(response){
                    $state.go('yeti.orabelle');
                })
                .catch(function(data){
                    console.log("unable to add row of orabelle data")
                    console.log(data.status);
                });
        };

        $scope.removeOrabelle = function (orabelle) {
            var confirmRemove = $window.confirm("Are you sure you want to delete this orabelle?");
            if (confirmRemove){
                console.log("Removing Orabelle");
                OrabelleSvc.delete($scope.orabelle)
                    .then(function(response){
                        $scope.reset();
                        $state.go('yeti.orabelle');
                    })
                    .catch(function(data){
                        console.log("Unable to delete orabelle with ID: " + orabelle._id);
                        console.log(data.status);
                    });
            }
        };

        $scope.reset = function () {
            $scope.orabelle = null;
            $state.go('yeti.orabelle');
        };
    });