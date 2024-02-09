const { src, dest, parallel } = require("gulp");

//imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = import("gulp-webp");
const avif = require("gulp-avif");

//minificar imagenes
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };

  src("src/img/**/*.{png,jpg}") //'{}' busca archivos con esas extensione'
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("public/img"));
  done();
}

async function versionAvif(done) {
  const opciones = {
    quality: 50,
  };

  const webpModule = await webp;
  src("src/img/**/*.{png,jpg}") //'{}' busca archivos con esas extensione'
    .pipe(avif(opciones))
    .pipe(dest("public/img"));
  done();
}

async function versionWebp(done) {
  const opciones = {
    quality: 50,
  };

  const webpModule = await webp;
  src("src/img/**/*.{png,jpg}") //'{}' busca archivos con esas extensione'
    .pipe(webpModule.default(opciones))
    .pipe(dest("public/img"));
  done();
}

exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = parallel(imagenes,versionAvif,versionWebp);