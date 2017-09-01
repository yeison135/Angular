var gulp = require('gulp'),
  connect = require('gulp-connect'),
  nodemon = require('gulp-nodemon');

// Inicia el servidor HTTP local para poder ejecutar la aplicacion
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: 8383,
    livereload: true,
    middleware: function(connect) {
        return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});

// Actualiza el navegador cuando se invoca la tarea HTML por WATCH 
gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
  gulp.src('./app/**/*.js')
    .pipe(connect.reload());
});

// Monitorea las carpetas para detectar cambios en los archivos y ejecutar
// la tarea especifica.
gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/**/*.js'], ['html']);
});



// Tarea que inica la ejecucion de gulp Connect - Sube el servidor y
// WATCH - monitorea los archivos.
gulp.task('default', ['connect', 'watch']);

