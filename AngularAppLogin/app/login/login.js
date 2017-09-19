var app = angular.module('app.login', []);

app.controller('loginController', ['$http', '$rootScope', '$scope','growl',
    function ($http, $rootScope, $scope, growl) {


localStorage.clear();

$scope.login={
    filtroUno:'',
    filtroDos:''
}

$scope.logia= function(){
    if ($scope.login.filtroUno != "" && $scope.login.filtroDos != ""){    
       $http({
          method: 'POST',
          url: 'http://localhost:8080/Restaurante/api/restaurante/consultarUsuario',
          data: $scope.login
      }).success(function (data) {
          if(data==true){
             window.location = ('#equipo');
             growl.success("Bienvenido");
          }else{
             growl.error("Usuario o contraseña incorrecta !!!"); 
          }                  
      }).error(function (data) {
          growl.success("Error consultando el usuario !!!!");  
      });
    }else {
        $scope.login.filtroUno = ''
        $scope.login.filtroDos = ''
    }
}

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

}]);