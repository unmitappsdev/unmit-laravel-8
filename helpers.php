<?php

if (!function_exists('get_name')) {

    function get_name($identifier,$classname,$nametype) {

        $classname = "App\\$classname";

        if (!class_exists($classname))
            return $identifier;

        $obj = new $classname;

        if (isset($obj->dataIdentifiers[$identifier])) {
            if (isset($obj->dataIdentifiers[$identifier][$nametype])) {
                return $obj->dataIdentifiers[$identifier][$nametype];
            }
		}

		foreach ($obj->dataIdentifiers as $k=>$v) {
			if (isset($v['alt_id']) && ($v['alt_id']==$identifier)) {
				if (isset($v[$nametype])) {
					return $v[$nametype];
				}
			}
		}

        return $identifier;
    }
}

if (!function_exists('column')) {
    function column($identifier,$classname) {
        return get_name($identifier,$classname,'col_name');
    }
}

if (!function_exists('desc')) {
    function desc($identifier,$classname) {
        return get_name($identifier,$classname,'desc_name');
    }
}

if (!function_exists('parseAnnouncement')) {
	function parseAnnouncement($s) {
		if ($i = strpos($s,"::")) {
			$prefix = substr($s,0,$i);
			$st = substr($s,$i+2);
			switch (strtoupper($prefix)) {
				case 'GREEN':
					$prefix = 'success'; break;
				case 'BLUE':
					$prefix = 'info'; break;
				case 'YELLOW':
					$prefix = 'warning'; break;
				case 'RED':
					$prefix = 'danger'; break;
				default:
					$prefix = 'danger'; break;
			}
		} else {
			$prefix = 'danger';
			$st = $s;
		}
		$retstr = <<<HTML
<div class="alert alert-{$prefix} alert-dismissible" role="alert">
	<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	<strong>Announcement: </strong>{$st}
</div>
HTML;

		return $retstr;
    }
}

if (!function_exists('getBaseDomain')) {
	function basedomain() {
		return env('PROXY_URL') ? env('PROXY_URL'):request()->getSchemeAndHttpHost();
	}
}
