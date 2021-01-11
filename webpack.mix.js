const mix = require('laravel-mix');

/**
 * @fileoverview Mix asset management
 *
 * Mix provides a clean, fluent API for defining some Webpack build steps
 * for your Laravel application. By default, we are compiling the Sass
 * file for the application as well as bundling up all the JS files.
 *
 * This file follows the style guide as found
 * on https://google.github.io/styleguide/jsguide.html (as of 2019-09-25)
 */

mix.webpackConfig({
  devtool: "source-map"
});

// compile javascript & sass resources
mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/site.js', 'public/js')
   .sass('resources/unm_sass/app.scss','public/css')
   .sass('resources/unm_sass/unm/unm.scss','public/css');

//  .browserSync({
//      files: [
//          'app/**/*',
//          'public/**/*',
//          'resources/**/*',
//          'routes/**/*'
//      ]
//  });

// compile individual React component resources
const cpath = 'resources/js/components/';
var path = require('path');
var fs = require('fs');
var cfiles = fs.readdirSync(cpath).forEach(file => {
    if ((path.extname(file).toLowerCase() === '.js') || (path.extname(file).toLowerCase() === '.jsx'))
        mix.react(cpath+file,'public/js/components');
});

// copy over image resources
mix.copy('resources/images/*','public/img');

// copy over css resources
mix.copy('resources/css/*','public/css');

// copy over webfonts for FA
mix.copy('resources/webfonts/*','public/webfonts');

// accommodate for versioning in production
if (mix.inProduction()) {
  mix.version();
}
