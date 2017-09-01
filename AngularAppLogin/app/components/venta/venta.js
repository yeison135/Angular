var app = angular.module('app.venta', []);

app.controller('VentaController', ['$http', '$rootScope', '$scope', 'growl',  // growl para los mensajes
    function ($http, $rootScope, $scope, growl) {

          $scope.persona = {
            idPersona: '',
            nombre: '',
            ciudad: '',
            telefono: '',
            direccion: ''
        }
        $scope.venta = {
            idVenta: '',
            cantidad: '',
            costo: '',
            fechaVenta: '',
            clienteCedula:{cedula:''}
        }
        $scope.clenteselet={};
        $scope.sectCliente = function(clenteA){
             $scope.clenteselet=clenteA;
            return  $scope.clenteselet;
        }

         $scope.initfiltro = {            
            filtroUno: ''
        };
        $scope.componenteT={};
        $scope.RegistrarVenta1 = function () {

            $http({
                method: 'POST',
                url: 'http://localhost:8080/Pctecno/api/pctecno/consultarComponenteTipo',
                data: $scope.initfiltro
            }).success(function (data) {
                $scope.componenteT = data;
                $scope.registarVenta();
                if ($scope.datos!= null) {
                    growl.success("Se registro el componente");
                }
            }).error(function (data) {
                console.log("N{o se registro el componente}");
            });
        }

        $scope.registarVenta = function () {
            $scope.sectCliente();
            $scope.componenteT.costo
            $scope.venta.clienteCedula.cedula= $scope.clenteselet.cedula;
            $http({                
                method: 'POST',
                url: 'http://localhost:8080/Pctecno/api/pctecno/registarVenta',
                data:  $scope.venta
            }).success(function (data) {
                $scope.cliente = data;
                growl.success("La consulta se realizo correctamente");
                $scope.variable = true;
                $scope.variable2 = true;
            }).error(function (data) {
                $scope.variable2 = false;
            });
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

        $http({
            method: 'GET',
            url: 'http://localhost:8080/Pctecno/api/pctecno/consultarcliente'
        }).success(function (data) {
            $scope.clientes = data;
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