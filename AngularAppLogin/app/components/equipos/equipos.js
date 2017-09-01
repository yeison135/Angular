var app = angular.module('app.equipos', []);

app.controller('EquiposController', ['$http', '$rootScope', '$scope',
    function ($http, $rootScope, $scope) {


        $http({
              method: 'GET',
              url: '../../archivo.json'
          }).success(function (data) {
              $scope.datos = data;
          }).error(function (data) {
              console.log("No cargo json");
          });


    }]);