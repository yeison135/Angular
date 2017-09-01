var app = angular.module('app.registrarauto', []);

app.controller('RegistrarautoController', ['$http', '$rootScope', '$scope', 'growl',
    function ($http, $rootScope, $scope, growl) {






        $scope.carroguardar = {
            "carNromotor": null,
            "carNroserie": null,
            "colorCol": { "colId": null },
            "lineaLin": { "linId": null }
        };
     

        $scope.enviarcarro = function () {

            $http({
                method: 'POST',
                url: 'http://localhost:8080/CAP-Negocio/api/ejemplo/guardarcarro', // metodo post para envar los datos del auto
                data: $scope.carroguardar
            }).success(function (data) {

                $scope.datos = data;
                if ($scope.datos == true) {
                    $scope.reiniciar();
                    growl.success("los datos se enviaron con exito");
                }

            }).error(function (data) {
                console.log("No cargo json");
            });
        }




        $scope.reiniciar = function () {

            $scope.carroguardar = {
                "carNromotor": null,
                "carNroserie": null,
                "colorCol": { "colId": null },
                "lineaLin": { "linId": null }
            };

        }




        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/CAP-Negocio/api/ejemplo/consultacolor'
        }).success(function (data) {
            $scope.tipo_Color = data;
        }).error(function (data) {
            console.log("No cargo json");
        });

         $http({
            method: 'GET',
            url: 'http://localhost:8080/CAP-Negocio/api/ejemplo/consultalinea'
        }).success(function (data) {
            $scope.tipo_linea = data;
        }).error(function (data) {
            console.log("No cargo json");
        });




    }]);