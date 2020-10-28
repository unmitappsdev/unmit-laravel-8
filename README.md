# Laravel-based development starter files

This includes files and instructions necessary to setup a Laravel-based application development in UNM IT Apps environment.

As of 2020-10-28, this is applicable for Laravel 8.x.

## Installation

### Prerequisite

Install runkit7

```bash
$ sudo pecl install channel://pecl.php.net/runkit7-4.0.0a2
```

### Using them in Laravel application project folder

1. Copy *OracleModel.php* to ./app folder
2. Run **composer dump-autoload**

## Usage

When creating models (e.g. ./app/MyModel.php)

```php
namespace App;

use App\OracleModel;

class MyModel extends OracleModel
{
}

```

./resources/models/MyModel.yaml

```yaml
connection: oracle
table: szvabcd
timestamps: false
incrementing: false
dataIdentifiers:
	id:
		desc_name: SBGI Code
		col_name: szvabcd_sbgi_code
	dist_code:
		desc_name: District Code
		col_name: szvabcd_dist_code
```
