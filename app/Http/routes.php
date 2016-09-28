<?php

header('Access-Control-Allow-Origin:  http://localhost:9000');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix' => 'v1', 'middleware' => 'cors'], function () {

	//Rit
	// ------------------------ V-DRIVE ROUTE ----------------------------------
	Route::get('admin/getAllDrivers', 'AdminController@getRegisteredDrivers');
	Route::post('admin/addNewDriver', 'AdminController@driverRegistration');
	Route::post('admin/deleteDriver', 'AdminController@DeleteDriver');
	Route::get('admin/{user_id}/getDriverDetails', 'AdminController@getDriverDetails');
	Route::post('admin/updateDriverInfo', 'AdminController@updateDriverInfo');
	Route::get('admin/getAllDriveRequest', 'AdminController@getAllDriveRequest');
	
	
	// ------------------------ DRIVER APP ROUTE --------------------------------
	Route::get('driver/validateDriver/{driver_code}', 'DriverController@validateDriverLogin');
	Route::get('driver/getAllActiveDrivers', 'DriverController@getAllActiveDrivers');
	Route::post('driver/startDrive', 'DriveController@startDrive');
	Route::post('driver/endDrive', 'DriveController@endDrive');
	
	// ------------------------ CUSTOMER APP ROUTE -------------------------------
	Route::post('customer/sendBookingRequest', 'DriveController@sendBookingRequest');
	Route::post('customer/assignDriverForRide', 'DriveController@assignDriverForRide');

	Route::post('customer/signup', 'CustomerController@signUp');
	Route::post('customer/signin', 'CustomerController@signIn');
	Route::post('customer/changepassword', 'CustomerController@changePassword');
	Route::post('customer/forgotpassword', 'CustomerController@forgotPassword');
	
		
});




