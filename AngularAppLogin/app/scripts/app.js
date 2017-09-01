var app = angular.module('app', ['ngRoute','app.standar','app.equipos','app.proveedor','app.directives',
'app.venta','app.inventario','angular-growl','app.cliente','app.login']);

app.controller('AppController', ['$scope','$http',
    function ($scope,$http) {
        

}]);


app.config(['$routeProvider',
    function ($routeProvider) {

    
    $routeProvider.
        when('/login', {
            templateUrl: '../components/login/login.html',
            controller: 'loginController'
        }).
        when('/standar', {
            templateUrl: '../components/standar/standar.html',
            controller: 'StandarController'
        }).
        when('/equipos', {
            templateUrl: '../components/equipos/equipos.html',
            controller: 'EquiposController'
        }).
        when('/proveedor', {
            templateUrl: '../components/proveedor/proveedor.html',
            controller: 'ProveedorController'
        }).
        when('/venta', {
            templateUrl: '../components/venta/venta.html',
            controller: 'VentaController'
        }).
        
        when('/cliente', {
            templateUrl: '../components/cliente/cliente.html',
            controller: 'ClienteController'
        }).
         when('/inventario', {
            templateUrl: '../components/inventario/inventario.html',
            controller: 'inventarioController'
        }).
         when('/inventario', {
            templateUrl: '../components/inventario/inventario.html',
            controller: 'inventarioController'
        }).
         when('/login', {
             templateUrl: '../login/login.html',
            controller: 'loginController'
        }).
        otherwise({
            redirectTo: '/login'
        });
        


}]);