<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Auth\Guards\CasGuard;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
		Auth::extend('cas',function($app, $name, array $config) {
			return new CasGuard();
		});

		Gate::define('view-district',function($user) {
			return true;
		});
    }
}
