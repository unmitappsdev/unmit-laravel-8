#!/bin/bash
PHP_VERSION=$(php -v | head -n 1 | cut -d ' ' -f 2 | cut -f1-2 -d'.')
REQUIRED_PHP_VERSION="7.3"
if [ "$(printf '%s\n' "$REQUIRED_PHP_VERSION" "$PHP_VERSION" | sort -V | head -n1)" != "$REQUIRED_PHP_VERSION" ]; then
	echo PHP version must be greater than $REQUIRED_PHP_VERSION. The current version is $(php -v | head -n 1 | cut -d ' ' -f 2).
	exit 1
fi
if ! php -m | grep -q "runkit7"; then
	echo PHP extension runkit7 must be installed before you can continue
	exit 1
fi
if ! php -m | grep -q "oci8"; then
	echo PHP extension oci8 must be installed before you can continue
	exit 1
fi
if ! php artisan --version | grep -q "Laravel Framework 8"; then
	echo You need to be using Laravel 8.x version before you can continue
	exit 1
fi
composer require phpoffice/phpspreadsheet
composer require elibyy/tcpdf-laravel
composer require symfony/yaml
composer require laravel/ui
./artisan ui react
composer require laracasts/utilities
composer require hanovate/cas
./artisan vendor:publish --tag=cas
wget -O ./webpack.mix.js https://raw.githubusercontent.com/hanovate/unmit/main/webpack.mix.js
wget -O ./package.json https://raw.githubusercontent.com/hanovate/unmit/main/package.json
wget -O ./app/helpers.php https://raw.githubusercontent.com/hanovate/unmit/main/helpers.php
wget -O ./app/OracleModel.php https://raw.githubusercontent.com/hanovate/unmit/main/OracleModel.php
wget -O ./app/Http/Kernel.php https://raw.githubusercontent.com/hanovate/unmit/main/Kernel.php
wget -O ./app/Http/Controllers/Controller.php https://raw.githubusercontent.com/hanovate/unmit/main/Controller.php
wget -O ./routes/web.php https://raw.githubusercontent.com/hanovate/unmit/main/web.php
wget -O ./routes/common.php https://raw.githubusercontent.com/hanovate/unmit/main/common.php
wget -O ./config/app-extra.php https://raw.githubusercontent.com/hanovate/unmit/main/app-extra.php
wget -O ./resources/js/components.tar.gz https://raw.githubusercontent.com/hanovate/unmit/main/components.tar.gz
mkdir -p app/Auth/Guards
wget -O ./app/Auth/Guards/CasGuard.php https://raw.githubusercontent.com/hanovate/unmit/main/CasGuard.php
mkdir -p app/Http/Controllers/Api
wget -O ./app/Http/Controllers/Api/BaseController.php https://raw.githubusercontent.com/hanovate/unmit/main/BaseController.php
wget -O ./cas.env https://raw.githubusercontent.com/hanovate/unmit/main/cas.env
cat cas.env >> .env
rm cas.env
# update composer.json
wget -O ./setup-composer.php https://raw.githubusercontent.com/hanovate/unmit/main/setup-composer.php
cp -p composer.json composer.json.dist
php setup-composer.php
(cat composer.json | python3 -m json.tool) > composer.tmp
mv composer.tmp composer.json
composer require yajra/laravel-oci8:^8
./artisan vendor:publish --tag=oracle
composer update
cd resources/js
tar -xzvf components.tar.gz
rm components.tar.gz
cd ../..
composer dump-autoload
./artisan ui:auth
npm install
npm install react
npm install react-dom
npm install react-hooks-async
npm run dev
