var app = angular.module('app.inventario', []);

app.controller('inventarioController', ['$http', '$rootScope', '$scope', 'growl',
    function ($http, $rootScope, $scope, growl) {

       

        $scope.componente = {
            fechaIngreso: '',
            cantidad: '',
            estado: '',
            ubicacion: '',
            descripcion: '',
            tipo: ''
        };

        $scope.Registrar = function () {

            $http({
                method: 'POST',
                url: 'http://localhost:8080/Pctecno/api/pctecno/actualizarComponente',
                data: $scope.componente
            }).success(function (data) {
                $scope.datos = data;
                if ($scope.datos == true) {
                    growl.success("Se registro el componente");
                }
            }).error(function (data) {
                console.log("N{o se registro el componente}");
            });
        }



        $scope.reiniciar = function () {

           $scope.componente={}

            };

        










    }]);