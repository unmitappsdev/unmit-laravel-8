#!/bin/bash
PHP_VERSION=$(php -v | head -n 1 | cut -d ' ' -f 2 | cut -f1-2 -d'.')
REQUIRED_PHP_VERSION="7.3"
if [ "$(printf '%s\n' "$REQUIRED_PHP_VERSION" "$PHP_VERSION" | sort -V | head -n1)" != "$REQUIRED_PHP_VERSION" ]; then
	echo PHP version must be greater than $REQUIRED_PHP_VERSION. The current version is $(php -v | head -n 1 | cut -d ' ' -f 2).
	exit 1
fi
if ! python3 --version | grep -q "Python 3"; then
	echo Python3 8.x must be installed before you can continue
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
#if ! node --version | grep -q "v14"; then
#	echo You need to be using NodeJS v14.x version before you can continue
#	exit 1
#fi

# git init
git init

# install Laravel packages
composer require phpoffice/phpspreadsheet
composer require elibyy/tcpdf-laravel
composer require symfony/yaml
composer require laravel/ui:*
./artisan ui react
composer require laracasts/utilities
composer require subfission/cas
./artisan vendor:publish --tag=cas --force
wget --inet4-only -O ./webpack.mix.js https://raw.githubusercontent.com/unmitappsdev/unmit/main/webpack.mix.js
wget --inet4-only -O ./package.json https://raw.githubusercontent.com/unmitappsdev/unmit/main/package.json
wget --inet4-only -O ./app/helpers.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/helpers.php
wget --inet4-only -O ./app/OracleModel.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/OracleModel.php
wget --inet4-only -O ./app/Http/Kernel.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/app/Http/Kernel.php
wget --inet4-only -O ./app/Http/Controllers/Controller.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/app/Http/Controllers/Controller.php
wget --inet4-only -O ./app/Http/Controllers/TextController.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/app/Http/Controllers/TextController.php
wget --inet4-only -O ./routes/web.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/routes/web.php
wget --inet4-only -O ./routes/common.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/routes/common.php
wget --inet4-only -O ./config/app-extra.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/config/app-extra.php
wget --inet4-only -O ./config/javascript.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/config/javascript.php
rm -f ./config/auth.php
wget --inet4-only -O ./config/auth.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/config/auth.php
mkdir -p app/Auth/Guards
wget --inet4-only -O ./app/Auth/Guards/CasGuard.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/CasGuard.php
mkdir -p app/Http/Controllers/Api
rm -f ./app/Http/Controllers/Api/BaseController.php
wget --inet4-only -O ./app/Http/Controllers/Api/BaseController.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/app/Http/Controllers/Api/BaseController.php
rm -f ./app/Providers/AuthServiceProvider.php
wget --inet4-only -O ./app/Providers/AuthServiceProvider.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/app/Providers/AuthServiceProvider.php
wget --inet4-only -O ./extra.env https://raw.githubusercontent.com/unmitappsdev/unmit/main/extra.env
wget --inet4-only -O ./resources.tar.gz https://raw.githubusercontent.com/unmitappsdev/unmit/main/resources.tar.gz
tar -xzvf resources.tar.gz
rm resources.tar.gz
cat extra.env >> .env
rm extra.env

# update .env to reflect UNM environment
sed -i '/DB_DATABASE=laravel/a DB_SERVICE_NAME=BAND' .env
sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=banner/' .env
sed -i 's/DB_HOST=127.0.0.1/DB_HOST=sband.unm.edu/' .env
sed -i 's/DB_PORT=3306/DB_PORT=1523/' .env
sed -i 's/DB_DATABASE=laravel/DB_DATABASE=BAND/' .env
sed -i 's/DB_USERNAME=root/DB_USERNAME=EnterNetIDHere/' .env
sed -i 's/DB_PASSWORD=/DB_PASSWORD=EnterPasswordHere/' .env
sed -i 's/BROADCAST_DRIVER=log/BROADCAST_DRIVER=redis/' .env
sed -i 's/CACHE_DRIVER=file/CACHE_DRIVER=redis/' .env
sed -i 's/QUEUE_CONNECTION=sync/QUEUE_CONNECTION=redis/' .env
sed -i 's/SESSION_DRIVER=file/SESSION_DRIVER=redis/' .env

# update composer.json
wget --inet4-only -O ./setup-composer.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/setup-composer.php
cp -p composer.json composer.json.dist
php setup-composer.php
(cat composer.json | python3 -m json.tool) > composer.tmp
mv composer.tmp composer.json
rm -f composer.json.dist
rm -f setup-composer.php
composer require yajra/laravel-oci8:^8
./artisan vendor:publish --tag=oracle --force
rm -f ./config/oracle.php
wget --inet4-only -O ./config/oracle.php https://raw.githubusercontent.com/unmitappsdev/unmit/main/config/oracle.php
composer update
composer dump-autoload
rm -f resources/css/app.css
# npm install
# npm audit fix
# npm run dev
