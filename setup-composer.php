<?php
$file = file_get_contents('./composer.json');

$jd = json_decode($file);

$jd->autoload->files = ['app/helpers.php'];

$json = json_encode($jd);

file_put_contents('composer.json',$json);
