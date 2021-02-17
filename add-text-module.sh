#!/bin/bash
wget -O ./app/Http/Controllers/TextController.php https://raw.githubusercontent.com/hanovate/unmit/main/app/Http/Controller/TextController.php
mkdir -p resources/views/admin
wget -O ./resources/views/admin/text-index.blade.php https://raw.githubusercontent.com/hanovate/unmit/main/resources/views/admin/text-index.blade.php
