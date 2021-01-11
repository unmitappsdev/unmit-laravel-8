<?php
namespace App\Auth\Guards;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;

class CasGuard implements Guard
{
	/*
	protected $user;

	protected $request;

	public function __construct(Request $request)
	{
		$this->request = $request;

		$this->user = cas()->user();
	}
	 */

	public function check()
	{
		return cas()->isAuthenticated();
	}

	public function guest()
	{
		return !cas()->isAuthenticated();
	}

	public function user()
	{
		if (cas()->isAuthenticated())
			return cas()->user();
		else
			return null;
	}

	public function id()
	{
		if (cas()->isAuthenticated())
			return cas()->user();
		else
			return null;
	}

	public function validate(array $credentials = [])
	{
		$netid = $credentials['netid'] ?? null;
		if ($netid == $this->user())
			return true;
		else
			return false;
	}

	public function setUser(Authenticatable $user)
	{
	}
}
