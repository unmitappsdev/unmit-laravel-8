<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

if (file_exists($rpath = base_path('routes').'/common.php')) include_once($rpath);

if (file_exists($rpath = base_path('routes').'/dev.php')) {
    Route::group(['prefix' => 'dev'],function() use ($rpath) {
        include_once($rpath);
    });
}

// We've defined the Auth routes manually for CAS,
// so native Auth routes aren't used for now until
// we can create more seamless integration for Azure AD later.
// Auth::routes();

Route::get('/', function () {
    return view('home');
})->name('main.home');

Route::get('login',function() {
	cas()->authenticate();
})->name('main.login');

Route::middleware(['cas.auth'])->group(function() {
	// main.logout
	Route::get('logout',function() {
		session()->forget('auth.account_type');
		return cas()->logout(null,route('main.home'));
	})->name('main.logout');

	Route::middleware(['can:admin'])->group(function() {
		Route::get('admin/text',[App\Http\Controllers\TextController,'index'])->name('admin.text');
		Route::post('admin/text',[App\Http\Controllers\TextController,'submit'])->name('admin.text-submit');
	});
});


// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
