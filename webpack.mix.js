const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/site.js', 'public/js')
   // .postCss('resources/css/app.css', 'public/css', [
   .sass('resources/unm_sass/app.scss','public/css')
   .minify('public/css/app.css','public/css/app.min.css')
   .sass('resources/unm_sass/unm/unm.scss','public/css')

const cpath = 'resources/js/components/';
var path = require('path');
var fs = require('fs');
var cfiles = fs.readdirSync(cpath).forEach(file => {
    if ((path.extname(file).toLowerCase() === '.js') || (path.extname(file).toLowerCase() === '.jsx'))
        mix.js(cpath+file,'public/js/components').react();
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
