var app = angular.module('app.proveedor', []);

app.controller('ProveedorController', ['$http', '$rootScope', '$scope', 'growl',   // growl para los mensajes
    function ($http, $rootScope, $scope, growl) {

        $scope.persona = {
            idPersona: '',
            nombre: '',
            ciudad: '',
            telefono: '',
            direccion: ''
        }
        sessionStorage.clear();
        $scope.filtro = {
            filtroDosId: ''
        }

        $scope.proveedores = [];
        $http({
            method: 'GET',
            url: 'http://localhost:8080/Pctecno/api/pctecno/consultarProveedores',
        }).success(function (data) {
            $scope.proveedores = data;
        }).error(function (data) {
            growl.error("EL usuario no existe con los parametros ingresados");
        });
        $scope.datosProveedor = {};
        $scope.filtro = {
            filtroDosId: ''
        }
        $scope.variable = false;
        $scope.variable2 = false;
        $scope.consultarProveedor = function () {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/Pctecno/api/pctecno/consultarProvedor',
                data: $scope.filtro
            }).success(function (data) {
                $scope.datosProveedor = data;
                growl.success("La consulta se realizo correctamente");
                $scope.variable = true;
                $scope.variable2 = true;
            }).error(function (data) {
                $scope.variable2 = false;
            });
        }

        $scope.personaenviar = function () {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/Pctecno/api/pctecno/registrarProveedor',
                data: $scope.persona
            }).success(function (data) {
                $scope.variable = true;
                $scope.datos = data;
                    $scope.reiniciar();
                    growl.success("El proveedor se registro de forma exitosa");              

                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/Pctecno/api/pctecno/consultarProveedores',
                }).success(function (data) {
                    $scope.proveedores = data;
                }).error(function (data) {
                    growl.error("EL usuario no existe con los parametros ingresados");
                });
            }).error(function (data) {
                growl.success("El cliente provablemente ya exista revise los datos y vuelva hacer el registro");
            });
        }

        $scope.reiniciar = function () {
            $scope.variable = false;
            $scope.filtro = {
                filtroDosId: ''
            }
            $scope.persona = {};
            $scope.variable2 = true;
            $('#myModal').modal('hide');
        }

        $scope.modalabrir = function () {
            $('#myModal').modal({ backdrop: 'static', keyboard: false })
        }

    }]);