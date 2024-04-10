# Laravel-based development starter files

This includes files and instructions necessary to setup a Laravel-based application development in UNM IT Apps environment.

This is for Laravel 8.x. For other versions of laravel, please look for another repository with the corresponding Laravel version.

## Installation

Please refer to the relevant UNM IT Applications Confluence documents for installation.


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
