<?php
namespace App\Http\Controllers;

use Input, DB, App, Config;
use App\Models\DriverRegistration;
use App\Http\Controllers\DriverRegistrationTransformer;
use Illuminate\Support\Facades\Mail;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class AdminController extends Controller
{
    
	/** ********************************************** VDRIVE ADMIN APIS ********************************************************** **/
	
    /** Rit
     * API for fetching all the registered drivers and their status.
     * GET /getRegisteredDrivers
     * @param 
     * @return Response
     * @internal param $data
     */
    public function getRegisteredDrivers()
    {
        
    	try {
            
    		$limit = Input::get('limit') ?: 10;
    
    		$users = DriverRegistration::paginate($limit);
    
    		if (!$users) {
    			return $this->responseNotFound('Driver Not Found!');
    		}
    
    		$fractal = new Manager();
    
    		$usersResource = new Collection($users, new DriverRegistrationTransformer);
    
    		$usersResource->setPaginator(new IlluminatePaginatorAdapter($users));
    
    		$data = $fractal->createData($usersResource);
    
    	} catch (Exception $e) {
    
    		return $this->setStatusCode(500)->respondWithError($e);
    	}
    
    	return $data->toJson();
    }
    

    /** Rit
     * API for new driver registration
     *
     * @return  Illuminate\Http\Response
     */
    public function driverRegistration()
    {
    	try {
    	    		
    		$user = new DriverRegistration;
    		$generatedDriverCode =bin2hex(openssl_random_pseudo_bytes(2));//16
    		
    	    $returnStatus = DB::table('driver_registration')->insert(array(
    		 		'driver_code' 		=> $generatedDriverCode,
    				'first_name' 		=> $inputs_array['firstname'],
    				'last_name' 		=> $inputs_array['lastname'],
    				'phone_number' 		=> $inputs_array['phonenumber'],
    	    		'licence_no' 		=> $inputs_array['licenceno'],
    	    		'car_type' 			=> $inputs_array['cartype'],
    				'email_id' 			=> $inputs_array['email'],
    				'status' 			=> "Offline"
    		));  
    	    $driverId = DB::getPdo()->lastInsertId();

    		$driverAddressId = DB::table('driver_address')->insert(array(
    				'address1' 	=> $inputs_array['address1'],
    				'address2' 	=> $inputs_array['address2'],
    				'city' 		=> $inputs_array['city'],
    				'pincode' 	=> $inputs_array['pincode'],
    				'state' 	=> $inputs_array['state'],
    				'country' 	=> $inputs_array['country'],
    				'driver_id' => $driverId
    		));
    		
    		$successResponse = [
    		'status' => true,
    		'message' => 'Driver Registered successfully!'
    				];
    		
    		return $this->setStatusCode(200)->respond($successResponse);
    	} catch (Exception $e) {
    		return $this->setStatusCode(500)->respondWithError("Driver registration failed.");
    	}
    }
    
    /** Rit
     * API for deleting the driver
     * @return mixed
     */
    public function DeleteDriver() {
    	try {
    
    		$inputs = Input::all();
    		$inputs_array = $inputs['data'];
    		
    		$userId = $inputs_array['user_id'];
    		
    		DB::table('driver_registration')->where('id', '=', $userId)->delete();
    
    		$successResponse = [
    		'status' => true,
    		'message' => 'Driver deleted successfully!'
    				];
    
    		return $this->setStatusCode(200)->respond($successResponse);
    
    	} catch (Exception $e) {
    		$errorMessage = [
    		'status' => false,
    		'message' => $e
    		];
    
    		return $this->setStatusCode(500)->respondWithError($errorMessage);
    	}
    }
    
    /** Rit
     * API for fetching the driver details.
     * @param $userId
     * @return mixed
     * @internal param $input
     */
    public function getDriverDetails($userId)
    {
    	try {
    		$users = DriverRegistration::with('address')->find($userId);
    		return $users->toJson();
    	} catch (Exception $e) {
    		return $this->setStatusCode(500)->respondWithError($e);
    	}
    }
    
    /** Rit
     * API for updating the driver information
     * @param $input
     * @return bool
     */
    public function updateDriverInfo(){
    	try {
    		
    		$inputs = Input::all();
    		$inputs_array = $inputs['data'];
    		
    		$driverId = $inputs_array['driverId'];
    		
    		$driverDetails = DriverRegistration::with('address')->find($driverId);
    		
    		$driverAddressDetails = DriverAddress::find((int)$driverDetails["address"]->id);
    		
    		
    		if(!$driverDetails) {
    			return 404;
    		}
    
    		if(isset($inputs_array['firstname']))
    		{
    			$driverDetails->first_name = $inputs_array['firstname'];
    		}
    		if(isset($inputs_array['lastname']))
    		{
    			$driverDetails->last_name = $inputs_array['lastname'];
    		}
    		if(isset($inputs_array['phonenumber']))
    		{
    			$driverDetails->phone_number = $inputs_array['phonenumber'];
    		}
    		if(isset($inputs_array['licenceno']))
    		{
    			$driverDetails->licence_no =$inputs_array['licenceno'];
    		}
    		if(isset($inputs_array['cartype']))
    		{
    			$driverDetails->car_type =$inputs_array['cartype'];
    		}
    		if(isset($inputs_array['email']))
    		{
    			$driverDetails->email_id = $inputs_array['email'];
    		} 
    		$driverDetails->save();
    		
    		if(isset($inputs_array['address1']))
    		{
    			$driverAddressDetails->address1 = $inputs_array['address1'];
    		}
    		if(isset($inputs_array['address2']))
    		{
    			$driverAddressDetails->address2 = $inputs_array['address2'];
    		}
    		if(isset($inputs_array['city']))
    		{
    			$driverAddressDetails->city = $inputs_array['city'];
    		}
    		if(isset($inputs_array['pincode']))
    		{
    			$driverAddressDetails->pincode = $inputs_array['pincode'];
    		}
    		if(isset($inputs_array['state']))
    		{
    			$driverAddressDetails->state = $inputs_array['state'];
    		}
    		if(isset($inputs_array['country']))
    		{
    			$driverAddressDetails->country = $inputs_array['country'];
    		} 
    		
    		$driverAddressDetails->save();
    		
       		return 200;
    	} catch (Exception $e) {
    		return $e;
    	}
    }
  
    /** Rit
     * API for fetching all the drive request placed by the customer.
     * GET /getAllDriveRequest
     * @param
     * @return Response
     * @internal param $data
     */
    public function getAllDriveRequest()
    {
    	try {
    		/* $limit = Input::get('limit') ?: 10; */
    
    		$bokinglist = DriveRequest::get();
    
    		if (!$bokinglist) {
    			return $this->responseNotFound('There is no booking found!');
    		}
    
    		/* $fractal = new Manager();
    
    		$usersResource = new Collection($users, new DriverRegistrationTransformer);
    
    		$usersResource->setPaginator(new IlluminatePaginatorAdapter($users));
    
    		$data = $fractal->createData($usersResource); */
    
    	} catch (Exception $e) {
    
    		return $this->setStatusCode(500)->respondWithError($e);
    	}
    
    	return $bokinglist->toJson();
    }
   
 
}