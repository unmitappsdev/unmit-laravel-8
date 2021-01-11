<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Symfony\Component\Yaml\Yaml;

/**
 * @see BaseController
 *
 * @version 0.1.1 2021-01-05 MH add a constructor
 *   0.1.0 2020-04-24 MH add getFormAttributes()
 *
 * @since 0.1.0
 */
class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public $basedomain;

	public function __construct() {
		$this->basedomain = env('PROXY_URL') ? env('PROXY_URL'):request()->getSchemeAndHttpHost();
	}

    public function getProcessedFormAttributeVars($content,$params = null)
    {
		$prefix = '%route:';
		$prefix_len = strlen($prefix);

		while (($i = strpos($content,$prefix)) !== false) {
			$j = strpos($content,'%',($i+1));
			$str = substr($content,$i,$j-$i+1);
			$paramvalue = substr($content,$i+$prefix_len,$j-($i+$prefix_len));

			$k = strpos($paramvalue,';');

			if ($k!==false) {
				$tmp = explode(';',$paramvalue);
				$newparam = [];
				foreach ($tmp as $v) {
					if (isset($params[$v])) {
						$newparam[$v] = $params[$v];
					}
				}
				$routepath = route($tmp[0],$newparam);
			} else {
				$routepath = route($paramvalue);
			}

			$content = str_replace($str,$routepath,$content);
		}

		$prefix = '%lang:';
		$prefix_len = strlen($prefix);

		while (($i = strpos($content,$prefix)) !== false) {
			$j = strpos($content,'%',($i+1));
			$str = substr($content,$i,$j-$i+1);
			$paramvalue = substr($content,$i+$prefix_len,$j-($i+$prefix_len));

			$langstr = '"'.__($paramvalue).'"';

			$content = str_replace($str,$langstr,$content);
		}

		return $content;
    }

	public function getFormAttributes($id,$params = null)
	{
		$config_vars = [];

		$filepath_without_ext = 'data/'.$id;

		if (file_exists($fn = resource_path($filepath_without_ext.'.json'))) {
			$json_content = file_get_contents($fn);
			$json_content = $this->getProcessedFormAttributeVars($json_content,$params);
			$config_vars = json_decode($json_content,true);
		} elseif (file_exists($fn = resource_path($filepath_without_ext.'.yaml'))) {
			$yaml_content = file_get_contents($fn);
			$yaml_content = $this->getProcessedFormAttributeVars($yaml_content,$params);
			$config_vars = Yaml::parse($yaml_content);
		}

		return $config_vars;
	}

	public function getProcessedTableAttributeVars($content)
	{
		// placeholder for now
		$prefix = '%customparamname:';
		$prefix_len = strlen($prefix);

		while (($i = strpos($content,$prefix)) !== false) {
			$j = strpos($content,'%',($i+1));
			$str = substr($content,$i,$j-$i+1);
			$paramvalue = substr($content,$i+$prefix_len,$j-($i+$prefix_len));

			$routepath = route($paramvalue);

			$content = str_replace($str,$routepath,$content);
		}

		return $content;
	}

	public function getTableAttributes($id, $model = null)
	{
		$config_vars = [];

		$filepath_without_ext = 'data/'.$id;

		if (file_exists($fn = resource_path($filepath_without_ext.'.json'))) {
			$json_content = file_get_contents($fn);
			$json_content = $this->getProcessedTableAttributeVars($json_content);
			$config_vars = json_decode($json_content,true);
		} elseif (file_exists($fn = resource_path($filepath_without_ext.'.yaml'))) {
			$yaml_content = file_get_contents($fn);
			$yaml_content = $this->getProcessedTableAttributeVars($yaml_content);
			$config_vars = Yaml::parse($yaml_content);
		}

		return $config_vars;
	}
}