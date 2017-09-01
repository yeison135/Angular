var app = angular.module('app.directives', []);

app.directive("ponerTitulo", function () {
    return {
        restrict: "E",
        scope: {
            ngModel: "=",
           
        },
        link: function ($scope, element, attrs) {
           },
        templateUrl: 'template_directiva.html'
    }
});


//Captura solo números
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        scope: {
            size: "="
        },
        link: function ($scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if ($scope.size) {
                    if (transformedInput.length > $scope.size) {
                        transformedInput = transformedInput.substring(0, $scope.size);
                    }
                }
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

//directiva para campos varchar o alfanumericos
app.directive('varchar', function() {
    return {
        restrict: "A",
        require: 'ngModel',
        scope: {
            size: "="
        },
        link: function ($scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^0-9a-zA-ZÑñáéíóúÁÉÍÓÚ\-\s]/g, '');
                //transformedInput = text.replace(/^\s/g, '');
                if ($scope.size) {
                    if (transformedInput.length > $scope.size) {
                        transformedInput = transformedInput.substring(0, $scope.size);
                    }
                }

                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});