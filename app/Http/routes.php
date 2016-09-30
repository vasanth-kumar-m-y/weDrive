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
	// ------------------------ ADMIN APP ROUTE ----------------------------------
	Route::get('admin/getAllDrivers', 'AdminController@getRegisteredDrivers');
	Route::post('admin/registerDriver', 'AdminController@driverRegistration');
	Route::post('admin/deleteDriver', 'AdminController@DeleteDriver');
	Route::get('admin/{user_id}/getDriverDetails', 'AdminController@getDriverDetails');
	//Route::post('admin/updateDriverInfo', 'AdminController@updateDriverInfo');
	Route::get('admin/getAllDriveRequest', 'AdminController@getAllDriveRequest');
	Route::post('admin/assignDriverForRide', 'AdminController@assignDriverForRide');

    // ------------------------ MASTER APP ROUTE --------------------------------
    Route::get('master/getPubs', 'MasterController@getAllPubs');
    Route::get('master/getTransmissionType', 'MasterController@getAllTransmissionType');
    Route::get('master/getCarType', 'MasterController@getAllCarType');
	Route::get('master/getCountries', 'MasterController@getAllCountries');
	Route::get('master/getStateByCountry/{country_id}', 'MasterController@getAllStatesByCountry');
	
	// ------------------------ DRIVER APP ROUTE --------------------------------
	Route::get('driver/validateDriver/{driver_code}', 'DriverController@validateDriverLogin');
	Route::get('driver/getAllActiveDrivers', 'DriverController@getAllActiveDrivers');
	
	// ------------------------ CUSTOMER APP ROUTE -------------------------------
	Route::get('customer/signup', 'CustomerController@signUp');
	Route::get('customer/signin', 'CustomerController@signIn');
	Route::post('customer/changepassword', 'CustomerController@changePassword');
	Route::post('customer/forgotpassword', 'CustomerController@forgotPassword');
	Route::post('customer/resetpassword', 'CustomerController@resetPassword');

    //------------------------ DRIVE APP ROUTE -------------------------------
    Route::post('driver/startDrive', 'DriveController@startDrive');
	Route::post('driver/endDrive', 'DriveController@endDrive');
	Route::post('customer/sendBookingRequest', 'DriveController@sendBookingRequest');
	Route::get('driver/bookingStatus/{driver_id}', 'DriveController@showBookingStatusForDriver');
	Route::get('customer/allbookingStatus/{customer_id}', 'DriveController@showAllBookingStatusForCustomer');
	Route::get('customer/bookingStatus/{customer_id}', 'DriveController@showBookingStatusForCustomer');

});




