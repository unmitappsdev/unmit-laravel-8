<?php

return [
    env('DB_CONNECTION','banner') => [
        'driver'         => 'oracle',
        'tns'            => env('DB_TNS', ''),
        'host'           => env('DB_HOST', 'sband.unm.edu'),
        'port'           => env('DB_PORT', '1523'),
        'database'       => env('DB_DATABASE', 'BAND'),
        'service_name'   => env('DB_SERVICE_NAME', 'BAND'),
        'username'       => env('DB_USERNAME', ''),
        'password'       => env('DB_PASSWORD', ''),
        'charset'        => env('DB_CHARSET', 'AL32UTF8'),
        'prefix'         => env('DB_PREFIX', ''),
        'prefix_schema'  => env('DB_SCHEMA_PREFIX', ''),
        'edition'        => env('DB_EDITION', 'ora$base'),
        'server_version' => env('DB_SERVER_VERSION', '19c'),
    ],
    env('DB_ODS_CONNECTION','ods') => [
        'driver'         => 'oracle',
        'tns'            => env('DB_ODS_TNS', ''),
        'host'           => env('DB_ODS_HOST', 'sodsd.unm.edu'),
        'port'           => env('DB_ODS_PORT', '1523'),
        'database'       => env('DB_ODS_DATABASE', 'ODSD'),
        'service_name'   => env('DB_ODS_SERVICE_NAME', 'ODSD'),
        'username'       => env('DB_ODS_USERNAME', ''),
        'password'       => env('DB_ODS_PASSWORD', ''),
        'charset'        => env('DB_ODS_CHARSET', 'AL32UTF8'),
        'prefix'         => env('DB_ODS_PREFIX', ''),
        'prefix_schema'  => env('DB_ODS_SCHEMA_PREFIX', ''),
        'edition'        => env('DB_ODS_EDITION', 'ora$base'),
        'server_version' => env('DB_ODS_SERVER_VERSION', '19c'),
    ],
];
