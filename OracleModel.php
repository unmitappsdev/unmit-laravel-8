<?php
namespace App;

use Yajra\Oci8\Eloquent\OracleEloquent as Model;
use Symfony\Component\Yaml\Yaml;

/**
 * Class: OracleModel
 *
 * @see Yajra\Oci8\Eloquent\OracleEloquent
 *
 * @author Michael Han <mhan1@unm.edu>
 * @version 0.1.4 2021-04-23 MH allow for blank relational keys
 *   0.1.3 2021-04-15 MH allow for %label% in resources/models/*.yaml
 *   0.1.2 2021-03-05 MH check for installed version of runkit and run *_method_add accordingly
 *   0.1.1 2020-10-28 MH accommodate for runkit 4.0.0a2: change runkit_method_add to runkit7_method_add
 * 	 0.1.0 2020-02-12 MH initial commit
 * @since 0.1.0
 */
class OracleModel extends Model
{
    /**
     * dataIdentifiers
     *
     * @var array
     */
	public $dataIdentifiers;

	public $runkit_version;

    /**
     * __construct
     *
     */
    function __construct()
    {
		parent::__construct();

		// get runkit version
		$extensions = get_loaded_extensions();
		$extkey = array_search('runkit7',$extensions);
		$this->runkit_version = phpversion($extensions[$extkey]);

        // -- set model attributes from config files if they exist

        // get called classname
        $called_classname_in_full = get_called_class();
        $called_classname = basename(str_replace("\\","/",$called_classname_in_full));

        // get the possible file path without the extension
        $filepath_without_extension = 'models/'.$called_classname;

        // process the config file and set model attributes if they exist
        if (file_exists($fn = resource_path($filepath_without_extension.'.json'))) {
            $this->initWithJsonSource($fn);
        } elseif (file_exists($fn = resource_path($filepath_without_extension.'.yaml'))) {
            $this->initWithYamlSource($fn);
        }

        // set getters and setters if dataIdentifiers exist
        if (isset($this->dataIdentifiers) && !empty($this->dataIdentifiers)) {
            $classname = static::class;

            foreach ($this->dataIdentifiers as $k=>$v) {
                if (!isset($v['col_name'])) continue;

                $methodname_key = str_replace('_','',ucwords($k,'_'));

                $this->addGetSetMethods($methodname_key,$classname,$v['col_name']);

                // repeat once more if alt_id exists
                if (isset($v['alt_id'])) {
                    $methodname_key = str_replace('_','',ucwords($v['alt_id'],'_'));
                    $this->addGetSetMethods($methodname_key,$classname,$v['col_name']);
                }
            }
        }
    }

    /**
     * getJsonResourceArray
     *
     */
    public function getJsonResourceArray() {
        if (empty($this->dataIdentifiers)) return;

        $result = [];

        foreach ($this->dataIdentifiers as $k => $v) {
            if (isset($v['rel_name'])) {
                $rel_name = $v['rel_name'];
                $tmp = explode("->",$rel_name);
                $resultchain = $this;
                foreach ($tmp as $v) {
                    $resultchain = $resultchain->$v;
                }
                $result[$k] = $resultchain;
			} elseif (isset($v['attr_name'])) {
				$attr_name = $v['attr_name'];
				$result[$k] = $this->$attr_name;
			} elseif (isset($v['format'])) {
                if (strpos($v['format'],'date')===0) {
                    if ($v['format']=='date.standard_timestamp') {
                        $tmp_date = \Carbon\Carbon::parse($this->$k);
                        $result[$k] = $tmp_date->isoFormat('MM/DD/YYYY h:mm A');
                    } elseif ($v['format']=='date.standard') {
                        $tmp_date = \Carbon\Carbon::parse($this->$k);
                        $result[$k] = $tmp_date->isoFormat('MM/DD/YYYY');
                    } elseif ($v['format']=='date.short_month') {
                        $tmp_date = \Carbon\Carbon::parse($this->$k);
                        $result[$k] = $tmp_date->isoFormat('MMM Do YYYY');
                    }
                } elseif(strpos($v['format'],'is ')===0) {
                    $tmp_date = \Carbon\Carbon::parse($this->$k);
                    $result[$k] = $tmp_date->isoFormat(substr($v['format'],3));
				} else {
					$result[$k] = $this->$k;
				}
			} else {
                $result[$k] = $this->$k;
            }

            if (isset($v['alt_id'])) {
                $result[$v['alt_id']] = $this->$k;
            }
        }

        return $result;
    }

    /**
     * getColumnName
     *
     * @param string $data_identifier
     */
    static function getColumnName($data_identifier)
    {
        if (isset($this->dataIdentifiers[$data_identifier]['col_name'])) {
            return $this->dataIdentifiers[$data_identifier]['col_name'];
        } else {
            return $data_identifier;
        }
    }

    /**
     * addGetSetMethods
     *
     * @param string $methodname_key
     * @param string $classname
     * @param string $attribname
     */
    private function addGetSetMethods($methodname_key,$classname,$attribname)
    {
		if (!method_exists($this,'get'.$methodname_key.'Attribute')) {
			if ($this->runkit_version == '4.0.0a2') 
				runkit7_method_add($classname,'get'.$methodname_key.'Attribute','$value',
					'return isset($this->attributes[\''.$attribname.'\']) ? $this->attributes[\''.$attribname.'\']:null;',RUNKIT_ACC_PUBLIC);
			else
				runkit_method_add($classname,'get'.$methodname_key.'Attribute','$value',
                'return isset($this->attributes[\''.$attribname.'\']) ? $this->attributes[\''.$attribname.'\']:null;',RUNKIT_ACC_PUBLIC);
        }

        if (!method_exists($this,'set'.$methodname_key.'Attribute')) {
			if ($this->runkit_version == '4.0.0a2') 
				runkit7_method_add($classname,'set'.$methodname_key.'Attribute','$value',
					'$this->attributes[\''.$attribname.'\'] = $value;',RUNKIT_ACC_PUBLIC);
			else
				runkit_method_add($classname,'set'.$methodname_key.'Attribute','$value',
					'$this->attributes[\''.$attribname.'\'] = $value;',RUNKIT_ACC_PUBLIC);
        }
    }

    /**
     * initWithJsonSource
     *
     * @param string $fn
     */
    private function initWithJsonSource($fn)
    {
        $json_content = file_get_contents($fn);
        $vars = json_decode($json_content,true);
        $this->setModelAttributes($vars);
    }

    /**
     * initWithYamlSource
     *
     * @param string $fn
     */
    private function initWithYamlSource($fn)
    {
        $yaml_content = file_get_contents($fn);
        $vars = Yaml::parse($yaml_content);
		$this->setModelAttributes($vars);
    }

    /**
     * setModelAttributes
     *
     * @param array $vars
     */
    private function setModelAttributes($vars)
    {
        extract($vars,EXTR_REFS | EXTR_SKIP);

		foreach ($vars as $k => $v) {
			$kvalue = $$k;

			$prefix = '%lang:';
			$prefix_len = strlen($prefix);

			if ((!is_array($kvalue)) && (($i = strpos($kvalue,$prefix)) !== false)) {
				$j = strpos($kvalue,'%',($i+1));
				$str = substr($kvalue,$i,$j-$i+1);
				$paramvalue = substr($kvalue,$i+$prefix_len,$j-($i+$prefix_len));

				$langstr = '"'.__($paramvalue).'"';
				
				$kvalue = $langstr;
			}

            $this->$k = $kvalue;
        }
    }
}
