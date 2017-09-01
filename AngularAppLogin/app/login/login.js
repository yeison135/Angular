var app = angular.module('app.login', []);

app.controller('loginController', ['$http', '$rootScope', '$scope','growl',
    function ($http, $rootScope, $scope, growl) {



$scope.login={
    nombre:'',
    cont:''
}

$scope.logia= function(){

if($scope.login.nombre=="cliente" && $scope.login.cont=="cliente"){

   window.location = ('#cliente');

}else{
    growl.error("Clave incorrecta");
}
if($scope.login.nombre=="venta" && $scope.login.cont=="venta"){

   window.location = ('#venta');

}
if($scope.login.nombre=="proveedor" && $scope.login.cont=="proveedor"){

   window.location = ('#proveedor');

}
if($scope.login.nombre=="inventario" && $scope.login.cont=="proveedor"){

   window.location = ('#inventario');

}


  var registrarPer = function(){
      $http({
          method: 'POST',
          url: 'http://localhost:8080/EasyParking/api/easyparking/RegistrarUsuario',
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

}

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

}]);