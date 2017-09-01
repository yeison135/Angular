// Code goes here
var app = angular.module('app.visorreportedirective', ['restangular', 'common'])


app.directive("visorReporteDirective", ['Restangular', 'growl', '$sce',
    function (Restangular, growl, $sce) {
        return {
            restrict: "E",
            scope: {
                ngModel: "="
            },
            link: function ($scope, element, attrs) {
                $scope.ngModel.procesarReporte = function () {
                    if ($scope.ngModel.result.bytesReporte &&
                            $scope.ngModel.result.tipoArchivo === "pdf" &&
                            $scope.ngModel.mostrarPDF &&
                            !$scope.ngModel.descargarAlGenerar) {
                        $scope.mostrarPDF = true;
                        $scope.mostrarDescargas = false;

                        this.pdfBase64 = $scope.ngModel.result.bytesReporte;
                        this.pdfData = base64ToUint8Array(this.pdfBase64);

                        var file = new Blob([this.pdfData], { type: 'application/pdf' });
                        $scope.fileURL = URL.createObjectURL(file);

                        $scope.content = $sce.trustAsResourceUrl($scope.fileURL);
                    } else {
                        $scope.mostrarPDF = false;
                        $scope.mostrarDescargas = true;

                        this.fileBase64 = $scope.ngModel.result.bytesReporte;
                        this.fileData = base64ToUint8Array(this.fileBase64);

                        var blob = new Blob([this.fileData], { type: 'application/octet-stream' });

                        if ($scope.ngModel.descargarAlGenerar) {
                            $scope.mostrarDescargas = false;
                            saveAs(blob, $scope.ngModel.result.nombreReporte + '.' + $scope.ngModel.result.tipoArchivo);
                        } else {
                            $scope.blobDescargar = blob;
                            $scope.nombreDescargar = $scope.ngModel.result.nombreReporte;
                            $scope.extensionDescargar = $scope.ngModel.result.tipoArchivo;
                        }
                    }
                }

                $scope.ngModel.generarProcesarReporte = function (entradaReporte) {
                    if (entradaReporte.tipoDocumento &&
                            ($scope.ngModel.mostrarPDF || !$scope.ngModel.mostrarPDF) &&
                            ($scope.ngModel.descargarAlGenerar || !$scope.ngModel.descargarAlGenerar)) {
                        Restangular.all('reportes/generarreporte').post(entradaReporte).then(function (result) {
                            if (result.bytesReporte) {
                                $scope.ngModel.result = result;
                                $scope.ngModel.procesarReporte();
                            }
                        });
                    }
                }

                $scope.ngModel.limpiarDirectiva = function () {
                    $scope.mostrarPDF = false;
                    $scope.mostrarDescargas = false;
                    $scope.descargarAlGenerar = false;
                    URL.revokeObjectURL($scope.fileURL);
                }

                $scope.mostrarPDF = false;
                $scope.mostrarDescargas = false;
                $scope.descargarAlGenerar = false;

                $scope.descargarArchivoGenerado = function () {
                    if ($scope.blobDescargar && $scope.blobDescargar && $scope.blobDescargar) {
                        saveAs($scope.blobDescargar, $scope.nombreDescargar + '.' + $scope.extensionDescargar);
                    }
                };



                /**
                 * Converts a base64 string into a Uint8Array
                 */
                function base64ToUint8Array(base64) {
                    var raw = atob(base64); //This is a native function that decodes a base64-encoded string.
                    var uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
                    for (var i = 0; i < raw.length; i++) {
                        uint8Array[i] = raw.charCodeAt(i);
                    }
                    return uint8Array;
                }
            },
            templateUrl: 'components/directives/visor-reporte-directive.html'
        }
    }]
);