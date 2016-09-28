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
    public function validateDriverLogin($driverCode)
    {
    	try {
    		$driverDetails = DriverRegistration::where('driver_code', '=', $driverCode)->get();
    
    		if (!$driverDetails) {
    			return $this->responseNotFound('Driver Not Found!');
    		}
    	} catch (Exception $e) {
    
    		return $this->setStatusCode(500)->respondWithError($e);
    	}
    	return $driverDetails->toJson();
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
    		
    		$driverDetails = DriverRegistration::where('status', '=', 'Online')
    											->get();
    
    		if (!$driverDetails) {
    			return $this->responseNotFound('Driver Not Found!');
    		}
    		
    	} catch (Exception $e) {
    		return $e;
    		//return $this->setStatusCode(500)->respondWithError($e);
    	}
    	return $driverDetails;
    }
    
    
   
 
}