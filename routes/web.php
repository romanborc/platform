<?php

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

Route::get('/', function () {
    return view('auth.login');
});
			
		/*==========-Dashboard Controller-============*/
Route::get('/dashboard', 'Dashboard\DashboardController@index');

		/*==========-API PROCUREMENTS-================*/
Route::get('/api/procurements/list', "Api\ProcurementsController@list");
Route::get('/api/procurement/get/{id}', "Api\ProcurementsController@one");
Route::put('/api/procurement/create', "Api\ProcurementsController@create");
Route::patch('/api/procurement/update', "Api\ProcurementsController@update");
Route::delete('/api/procurement/delete/{id}', "Api\ProcurementsController@delete");

Route::get('/api/procurement/subject', "Api\ProcurementsController@subject");
Route::get('/api/procurement/status', "Api\ProcurementsController@status");
Route::get('/api/procurement/type', "Api\ProcurementsController@type");

		/*=============-API USER-================*/
Route::get('/api/user/get/{id}', "Api\UsersController@one");
Route::get('/api/users/list', "Api\UsersController@list");
Route::patch('/api/user/update', "Api\UsersController@update");
Route::get('/api/user-result/list', "Api\UsersController@usersResultList");
Route::get('/api/user/positions', "Api\UsersController@positions");
Route::get('/api/user/regions', "Api\UsersController@regions");

		/*=============-API RESULT-================*/
Route::get('/api/results/list', "Api\ResultsController@list");
Route::get('/api/result/get/{id}', "Api\ResultsController@one");
Route::put('/api/results/create', "Api\ResultsController@create");
Route::patch('/api/result/update', "Api\ResultsController@update");
Route::get('/api/result/status_winners', "Api\ResultsController@status_winner");
Route::get('/api/result/participants', "Api\ResultsController@participants");
Route::delete('/api/result/delete/{id}', "Api\ResultsController@delete");

Auth::routes();
