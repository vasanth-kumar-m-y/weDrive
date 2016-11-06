<?php
namespace App\Http\Controllers;

use Input, DB, App, Config;
use App\Models\Admin;
use App\Models\DriverRegistration;
use App\Repositories\DriverRegistrationRepository;
use App\Http\Controllers\DriverRegistrationTransformer;
use App\Models\DriveRequest;
use Illuminate\Support\Facades\Mail;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class AdminController extends Controller
{

    public function __construct(DriverRegistrationRepository $driverRegistration)
    {
       parent::__construct();
       $this->driverRegistration = $driverRegistration;
    }
    

	/** ********************************************** VDRIVE ADMIN APIS ********************************************************** **/
	
    /** Rit
     * API for fetching all the registered drivers and their status.
     * GET /getRegisteredDrivers
     * @param 
     * @return Response
     * @internal param $data
     */

    public function adminLogIn()
    {
        try{

            $inputs = Input::all();

            $inputs_array = $inputs['data'];

            $admin = Admin::where('email', '=', $inputs_array['email'])->where('password', '=', md5($inputs_array['password']))->first();
                
                if (!empty($admin)) {
                       $response = [
                           'status'  => true,
                           'code' => 200,
                           'admin' => $admin
                         ];
                        return $response;
                
                } else {
                     $response = [
                           'status'  => false,
                           'code' => 401,
                           'message' => 'Admin authentication failed.'
                         ];
                        return $response;
                }

            }catch(Exception $e){
                $response = [
                           'status'  => false,
                           'code' => 501,
                           'message' =>  'Error occured! Please try later'
                         ];
                return json_encode($response);

            }
              
    }


    public function getRegisteredDrivers()
    {
        
    	try {
            
    		$limit   = Input::get('limit') ?: 10;
    
    		$drivers =  DriverRegistration::with('address', 'transmissionType')->paginate($limit);
  
    		if (!$drivers) {
    			return $this->responseNotFound('Driver Not Found!');
    		}
    
    		$fractal = new Manager();
    
    		$usersResource = new Collection($drivers, new DriverRegistrationTransformer());
    
    		$usersResource->setPaginator(new IlluminatePaginatorAdapter($drivers));
    
    		$data = $fractal->createData($usersResource);
    
    	} catch (Exception $e) {
    
    		$errorMessage = [
                'status'   => false,
                'message'  => $e
            ];
    
            return $this->setStatusCode(500)->respondWithError($errorMessage);
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
             
            $inputs       = Input::all();

            $inputs_array = $inputs['data'];

            $generatedDriverCode = bin2hex(openssl_random_pseudo_bytes(2));//16

            $this->driverRegistration->registerDriver($generatedDriverCode, $inputs_array);

            $successResponse = [
                    'status'  => true,
                    'message' => 'Driver Registered successfully!'
            ];
            
            return $this->setStatusCode(200)->respond($successResponse);
        
        } catch (Exception $e) {
    
            $errorMessage = [
                'status'  => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

    }
    
    /** Rit
     * API for deleting the driver
     * @return mixed
     */
    public function DeleteDriver() 
    {

    	try {
    
    		$inputs = Input::all();

    		$inputs_array = $inputs['data'];
    		
    		$driverId = $inputs_array['user_id'];
    		
    		DriverRegistration::where('id', $driverId)->delete();
    
    		$successResponse = [
        		'status'  => true,
        		'message' => 'Driver deleted successfully!'
    		];
    
    		return $this->setStatusCode(200)->respond($successResponse);
    
    	} catch (Exception $e) {

    		$errorMessage = [
        		'status'   => false,
        		'message'  => $e
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
    public function getDriverDetails($driverId)
    {
    	try {

    		$drivers = DriverRegistration::with('address', 'transmissionType')->find($driverId);

    		return $drivers->toJson();

    	} catch (Exception $e) {

    		$errorMessage = [
                'status'   => false,
                'message'  => $e
            ];
    
            return $this->setStatusCode(500)->respondWithError($errorMessage);
    	}
    }
    
    /** Rit
     * API for updating the driver information
     * @param $input
     * @return bool
     */
   /* public function updateDriverInfo(){
    	try {
    		
    		$inputs       = Input::all();
    		$inputs_array = $inputs['data'];
    		
    		$driverId      = $inputs_array['driverId'];
    		
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
    }*/
  
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


    /** Rit
     * API for accepting the driver request and assigning the driver for the requested customer.
     * POST /assignDriverForRide
     * @param input
     * @return Response
     * @internal param $drive_request_id
     */
    public function assignDriverForRide()
    {
        try {
            $inputs       = Input::all();
            $inputs_array = $inputs['data'];

            $driveId      = $inputs_array['driveId'];
            
            $driveDetails = DriveRequest::find($driveId);

            $driveDetails->driver_id = $inputs_array['driverId'];
            $driveDetails->status    = "Assigned";

            $driveDetails->save();
            
        } catch (Exception $e) {

            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

        return $driveDetails;
    }


    public function LogOut($id)
    {

      try {

        $admin = Admin::find($id);

        if(empty($admin)){

          $response =  [
                       'status'  => false,
                       'code'     => 401,
                       'message' => 'No admin exist with this Id'
                     ];
                    return json_encode($response);

        }else{

          $response =  [
                         'status'   => true,
                         'code'     => 200,
                         'admin' => $admin,
                         'message'  => 'Logged out successfully!'
                       ];
                      return json_encode($response);

        }

        } catch (Exception $e) {

            $response = [
                       'status'  => false,
                       'code'    => 501,
                       'message' => 'Error occured! Please try later'
                     ];

            return json_encode($response);  
        }
    }


   
 
}