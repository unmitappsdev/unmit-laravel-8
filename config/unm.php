<?php

return [
    'rest-api' => [
        'default' => [
            'client-id' => env('RESTAPI_CLIENT_ID'),
            'client-secret' => env('RESTAPI_CLIENT_SECRET'),
            'base-url' => env('RESTAPI_BASE_URL'),
            'cert' => '/etc/ssl/certs/_wildcard.unm.edu+3.pem'
        ],
        'unm-rest-api' => [
            'client-id' => 1,
            'client-secret' => 'KFdmEfn6EexcsylAeix4m5Y6EVzomDO78RwQshHv',
            'base-url' => 'http://rest-api.unm.edu',
            'auth-uri' => '/oauth/token',
            'cert' => '/etc/ssl/certs/ssl_key.pem'
        ],
        'oraapi02d' => [
            'client-id' => 1,
            'client-secret' => 'KFdmEfn6EexcsylAeix4m5Y6EVzomDO78RwQshHv',
            'base-url' => 'https://oraapi02d.unm.edu',
            'auth-uri' => '/oauth/token',
            'cert' => '/etc/ssl/certs/ssl_cert-key.pem'
        ]

    ],

    'localcerts' => [
        'coa.unm.edu' => '/etc/ssl/certs/dev.pem',
        'oraapi02d.unm.edu' => '/etc/ssl/certs/ssl_cert-key.pem'
	],

	'browser' => [
		'default-page-title' => config('app.name','Base application'),
		'main-title' => 'Home'
	],

	'appworx_folder' => env('APPWORX_FOLDER','/nfs/jobsub-devl'),

	// put application-specific environment/config variables below here
];
