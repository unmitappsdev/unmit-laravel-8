<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TextController extends Controller
{
	public function index()
	{
		$locale = \App::getLocale();
		$text = \Lang::getLoader()->load($locale,'text');

		return view('admin.text-index',compact('text','locale'));
	}

	public function submit(Request $request)
	{
		$locale = \App::getLocale();

		$input = $request->all();
		unset($input['_token']);

		$file = resource_path('lang/'.$locale.'/text.php');

		$fp = fopen($file,'w');
		fwrite($fp,'<?php return '.var_export($input,true).';');
		fclose($fp);

		return $this->index();
	}
}
