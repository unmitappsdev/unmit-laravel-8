<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

/**
 * @see Controller
 *
 * @version 0.1.2 2021-10-19 MH add sortfuncs parameter to allow DB native functions for sorting (e.g. TO_NUMBER)
 *	 0.1.1 2021-02-25 George Raione - allow multiple searches separated by explode()
 *   0.1.0 2020-05-08 MH - initial commit
 *
 * @since 0.1.0
 */

class BaseController extends Controller
{

	public function listOfValues($model,$param) {
		if (isset($param['type']))
			$type = $param['type'];
		else
			$type = request()->query('type') ?? null;

		if (isset($param['limit']))
			$limit = $param['limit'];
		else
			$limit = request()->query('limit') ?? null;

		if (isset($param['offset']))
			$offset = $param['offset'];
		else
			$offset = request()->query('offset') ?? null;

		if (isset($param['search']))
			$search = $param['search'];
		else
			$search = request()->query('query') ?? null;

		if (isset($param['sort']))
			$sort = $param['sort'];
		else
			$sort = request()->query('sort') ?? null;

		if (isset($param['sortfuncs']))
			$sortfuncs = $param['sortfuncs'];
		else
			$sortfuncs = request()->query('sortfuncs') ?? null;

		$datacols = $model->dataIdentifiers;

		if ($sort) {
			$sort_elems = explode(',',$sort);
		} else {
			$sort_elems = null;
		}

		if ($sortfuncs) {
			$sortfunc_elems = explode(',',$sortfuncs);
		} else {
			$sortfunc_elems = null;
		}

		if (isset($param['extra'])) {
			$extraparam = $param['extra'];
		} else {
			$extraparam = [];
		}
		$objBase = $this->objBaseQuery($model,$search,$datacols,$extraparam);

		$total = $objBase->count();

		$objs = $objBase->when($limit,function($query,$limit) {
			return $query->limit($limit);
		})->when($offset,function($query,$offset) {
			return $query->offset($offset);
		})->when($sort,function($query,$sort) use ($sort_elems,$sortfunc_elems,$datacols) {
			foreach ($sort_elems as $v) {
				if (substr($v,-1) == '-') {
					$canonical_key = substr($v,0,-1);
					$key = $datacols[$canonical_key]['col_name'];
					$dir = 'desc';
				} else {
					$canonical_key = $v;
					$key = $datacols[$canonical_key]['col_name'];
					$dir = 'asc';
				}
				$found = false;
				foreach($sortfunc_elems as $vv) {
					$sf_elems = explode('=',$vv);
					if ($sf_elems[0]==$canonical_key) {
						$key = $sf_elems[1].'('.$key.')';
						$found = true;
					}
				}
				if ($found)
					$query = $query->orderByRaw($key.' '.$dir);
				else
					$query = $query->orderBy($key,$dir);
			}
			return $query;
		})->get();

		// convert to a collection resource
		$modelname = "App\\Http\\Resources\\".class_basename(get_class($model));
        $result =  $modelname::collection($objs);

        // return msdg
        $msg = 'Data retrieved successfully';

        return $this->sendResponse($result,$msg,$total);
	}

    public function sendResponse($result, $message, $total = null)
	{
		if (($result instanceof Illuminate\Database\Eloquent\Collection) || is_a($result,"Illuminate\Http\Resources\Json\AnonymousResourceCollection")) {
			if (!$total) {
				$total = $result->count();
			}

			$response = [
				'success' => true,
				'total' => $total,
				'message' => $message,
				'data' => $result
			];
		} else {
			$response = [
				'success' => true,
				'message' => $message,
				'data' => $result
			];
		}

        return response()->json($response,200);
	}

    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

	public function objBaseQuery($model,$search,$datacols,$extraparam = null) {
		$modelname = get_class($model);
		$modelname = substr($modelname,strrpos($modelname,'\\')+1);
		$exploder = $extraparam['exploder'] ?? null;
        if (isset($extraparam['exploder'])) unset($extraparam['exploder']);
		$obj = $model::when($search,function($query,$search) use ($datacols,$model,$exploder) {
			$split_search = ($exploder != null && $exploder != '') ? explode($exploder,$search) : [$search];
			foreach ($split_search as $search) {
				$query = $query->where(function($q) use ($datacols,$search,$model) {
					$search = strtoupper($search);
					foreach ($datacols as $k=>$v) {
						if (isset($v['col_name']) && !(isset($v['no_search']) && $v['no_search'])) {
							$q = $q->orWhereRaw('UPPER('.$v['col_name'].") LIKE '%".$search."%'");
						} elseif (isset($v['search_col_name'])) {
							if (strpos($v['search_col_name'],',')!==false) {
								$search_col_name = explode(',',$v['search_col_name']);
								foreach ($search_col_name as $vv) {
									$q = $q->orWhereRaw('UPPER('.strtoupper($vv).") LIKE '%".$search."%'");
								}
							}
						} elseif (isset($v['rel_name'])) {
							$tmp = explode('->',$v['rel_name']);
							$relmain = $tmp[0];
							$elemain = $tmp[1];
							if (isset($v['model_name'])) {
								$modname = $v['model_name'];
								$q = $q->orWhereHas($relmain,function($q) use ($modname,$elemain,$search) {
									$q->whereRaw('UPPER('.column($elemain,$modname).") LIKE '%".$search."%'");
								});
							}
						}
					}
				});
			}
			return $query;
		})->when($extraparam,function($query,$extraparam) use ($modelname) {
			if (is_array($extraparam)) {
				foreach ($extraparam as $k=>$v) {
					if (is_array($v)) {
						if (in_array('NOT IN',array_map('strtoupper',array_keys($v)))) {
							$qstr = 'NOT (';
							$firstfound = false;
							foreach ($v['NOT IN'] as $vv) {
								if ($firstfound)
									$qstr .= 'OR ';
								if (strpos($vv,'%')) {
									$qstr .= column($k,$modelname).' LIKE ? ';
								} else {
									$qstr .= column($k,$modelname).' = ? ';
								}
								$firstfound=true;
							}
							$qstr .= ')';
							$query = $query->whereRaw($qstr,$v['NOT IN']);
						} elseif (in_array('RAW',array_map('strtoupper',array_keys($v)))) {
							$qstr = '('.$v['RAW'].')';
							$query = $query->whereRaw($qstr);
						} else {
							$query = $query->whereIn(column($k,$modelname),$v);
						}
					} elseif (strtoupper($v) == 'IS NOT NULL') {
						$query = $query->whereNotNull(column($k,$modelname));
					} else {
						$query = $query->where(column($k,$modelname),$v);
					}
				}
			}
			return $query;
		});

		return $obj;
	}
}
