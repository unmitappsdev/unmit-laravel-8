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
wget https://raw.githubusercontent.com/hanovate/unmit/main/webpack.mix.js -P ./
wget https://raw.githubusercontent.com/hanovate/unmit/main/package.json -P ./
wget https://raw.githubusercontent.com/hanovate/unmit/main/helpers.php -P ./app
wget https://raw.githubusercontent.com/hanovate/unmit/main/OracleModel.php -P ./app
wget https://raw.githubusercontent.com/hanovate/unmit/main/Kernel.php -P ./app/Http
wget https://raw.githubusercontent.com/hanovate/unmit/main/Controller.php -P ./app/Http/Controllers
wget https://raw.githubusercontent.com/hanovate/unmit/main/web.php -P ./routes
wget https://raw.githubusercontent.com/hanovate/unmit/main/common.php -P ./routes
wget https://raw.githubusercontent.com/hanovate/unmit/main/app-extra.php -P ./config
wget https://raw.githubusercontent.com/hanovate/unmit/main/components.tar.gz -P ./resources/js
mkdir -p app/Auth/Guards
wget https://raw.githubusercontent.com/hanovate/unmit/main/CasGuard.php -P ./app/Auth/Guards
mkdir -p app/Http/Controllers/Api
wget https://raw.githubusercontent.com/hanovate/unmit/main/BaseController.php -P ./app/Http/Controllers/Api/
wget https://raw.githubusercontent.com/hanovate/unmit/main/cas.env
cat cas.env >> .env
./artisan vendor:publish --tag=cas
# update composer.json
wget https://raw.githubusercontent.com/hanovate/unmit/main/setup-composer.php -P ./
cp -p composer.json composer.json.dist
php setup-composer.php
(cat composer.json | python3 -m json.tool) > composer.tmp
mv composer.tmp composer.json
composer require yajra/laravel-oci8:^8
./artisan vendor:publish --tag=oracle
composer require phpoffice/phpspreadsheet
composer require elibyy/tcpdf-laravel
composer require symfony/yaml
composer require laravel/ui
composer require laracasts/utilities
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
