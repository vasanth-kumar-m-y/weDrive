<?php

namespace App\Http\Controllers;

use Input, DB, App, Config;
use App\Models\DriverRegistration;

use Illuminate\Support\Facades\Mail;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class DriverController extends Controller
{
    
	/** ********************************************** DRIVER APIS ********************************************************** **/
    
    /** Rit
     * API for validatig the driver and login to the driver app.
     * GET /validateDriverLogin
     * @param
     * @return Response
     * @internal param $driverDetails
     */
    public function driverSignIn()
    {
    	try {

            $inputs = Input::all();

            $inputs_array = $inputs['data'];

    		    $driverDetails = DriverRegistration::where('driver_code', '=', $inputs_array['driverCode'])->first();

    		if (!empty($driverDetails)) {

                $driverDetails->status = 'Online'; 

                $driverDetails->save();

                   $response = [
                       'status'  => true,
                       'code'    => 200,
                       'message' => 'Driver authenticated successfully!'
                     ];
                    return json_encode($response);
            
            } else {
                 $response = [
                       'status'  => false,
                       'code'    => 401,
                       'message' => 'Driver authentication failed.'
                     ];
                    return json_encode($response);
            }

        }catch(Exception $e){
            $response = [
                       'status'  => false,
                       'code'    => 501,
                       'message' =>  'Error occured! Please try later'
                     ];
            return json_encode($response);

        }
    }


    public function driverSignOut($driver_code)
    {

      try {

            $driverDetails = DriverRegistration::where('driver_code', '=', $driver_code)->first();

            if (!empty($driverDetails)) {

                $driverDetails->status = 'Offline'; 

                $driverDetails->save();

                   $response =  [
                       'status'  => true,
                       'code'    => 200,
                       'message' => 'Logged out successfully!'
                     ];
                    return json_encode($response);
            
            } else {
                 $response = [
                       'status'  => false,
                       'code'    => 401,
                       'message' => 'Driver authentication failed.'
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


    
    /** Rit
     * API for fetching all active drivers logged in.
     * GET /getAllActiveDrivers
     * @param
     * @return Response
     * @internal param $driverDetails
     */
    public function getAllActiveDrivers()
    {
    	try {
    		
    		$driverDetails = DriverRegistration::where('status', '=', 'Online')->get();
    											
    
    		if (!$driverDetails) {
    			return $this->responseNotFound('Driver Not Found!');
    		}
    		
    	} catch (Exception $e) {
    		
    		return $this->setStatusCode(500)->respondWithError($e);
    	}
    	return $driverDetails;
    }
    
    
   
 
}