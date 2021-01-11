<?php
$proxy_url = getenv('PROXY_URL');
$proxy_scheme = getenv('PROXY_SCHEME');
if (!empty($proxy_url)) URL::forceRootUrl($proxy_url);
if (!empty($proxy_scheme)) URL::forceScheme($proxy_scheme);
