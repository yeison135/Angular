var app = angular.module('app.usuario', []);

app.controller('Usuariocontroller', ['$http', '$rootScope', '$scope', 'growl',  // growl para los mensajes
    function ($http, $rootScope, $scope, growl) {

        $scope.filtro = {
            filtroId: ''
        }

        $scope.usuario = {
            idUsuario: '',
            nombreUsuario: '',
            usuario: '',
            contrasena: ''
        }

        $scope.reiniciar = function () {                           // metodo para que queden en blanco los campos al enviarsen 
            $scope.usuario = {
                idUsuario: '',
                nombreUsuario: '',
                usuario: '',
                contrasena: ''
            }
            $scope.filtro = {
                filtroId: ''
            }
        }


        $scope.consultarUsuario = function () {
            $http({

                method: 'POST',
                url: 'http://localhost:8080/parkingbd/api/parking/consultausuarios',
                data: $scope.filtro
            }).success(function (data) {
                $scope.usuario = data;
                growl.success("La consulta se realizo correctamente");
               
            }).error(function (data) {
                growl.error("El usuario ingresado no existe");
                console.log("No cargo json");
            });
        }


    }]);