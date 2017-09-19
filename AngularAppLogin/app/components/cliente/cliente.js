var app = angular.module('app.cliente', []);

app.controller('ClienteController', ['$http', '$rootScope', '$scope', 'growl',  // growl para los mensajes
    function ($http, $rootScope, $scope, growl) {

        localStorage.clear();

        $scope.persona = {
            idPersona: '',
            nombre: '',
            ciudad: '',
            telefono: '',
            direccion: ''
        }
        sessionStorage.clear();
        // parametros para registrar el cliente
        $scope.clienteP = {
            cedula: $scope.persona.idPersona,
            personaidPersona: $scope.persona.idPersona

        }

        $scope.filtro = {
            filtroDosId: ''
        }
        $scope.variable = false;
        $scope.variable2 = false;
        $scope.consultarCliente = function () {
            $http({

                method: 'POST',
                url: 'http://localhost:8080/Pctecno/api/pctecno/consultarclienteparam',
                data: $scope.filtro
            }).success(function (data) {
                $scope.cliente = data;
                growl.success("La consulta se realizo correctamente");
                $scope.variable = true;
                $scope.variable2 = true;
            }).error(function (data) {
                $scope.variable2 = false;
            });
        }

        $scope.eliminar= function(cliente){
            
             $http({
                method: 'POST',
                url: 'http://localhost:8080/Pctecno/api/pctecno/eliminarCliente',
                data: cliente
            }).success(function (data) {                
                $scope.variable = true;
                $scope.variable2 = true;
                growl.success("El cliente fue eliminado"+data);
                $scope.reiniciar();
               
            }).error(function (data) {
                $scope.variable2 = false;
            });

        };


        $scope.agregarPersona = function () {
            $http({

                method: 'POST',
                url: 'http://localhost:8080/Pctecno/api/pctecno/agregarPersona',
                data: $scope.persona
            }).success(function (data) {
                $scope.cliente = data;
                $scope.variable = true;
                $scope.variable2 = true;
                growl.success("El clente se registro de forma exitosa");
                $scope.reiniciar();
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/Pctecno/api/pctecno/consultarcliente'
                }).success(function (data) {
                    $scope.clientes = data;
                }).error(function (data) {
                    console.log("error");
                });

            }).error(function (data) {
                $scope.variable2 = false;
            });
        }
        $scope.datos=[];
        $http({
            method: 'GET',
            url: 'http://35.184.175.53:8080/EasyParking/api/easyparking/ConsultaPersonas'
        }).success(function (data) {
            $scope.datos = data;
            
        }).error(function (data) {
            console.log("error");
        });

        $scope.reiniciar = function () {
            $scope.variable = false;
            $scope.filtro = {
                filtroDosId: ''
            }
            
            $scope.variable2 = true;
            $('#myModal').modal('hide');
        }

        $scope.modalabrir = function () {
            $('#myModal').modal({ backdrop: 'static', keyboard: false })
        }
    }]);