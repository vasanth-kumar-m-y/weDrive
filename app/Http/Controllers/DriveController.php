<?php

namespace App\Http\Controllers;

use Input, DB, App, Config;
use App\Models\DriveRequest;

use Illuminate\Support\Facades\Mail;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;
use App\Repositories\DriveRequestRepository;

class DriveController extends Controller
{

    public function __construct(DriveRequestRepository $driveRequest)
    {
       parent::__construct();
       $this->driveRequest = $driveRequest;
       date_default_timezone_set("Asia/Kolkata");
    }
    
	/** ********************************************** DRIVE APIS ********************************************************** **/
    
    /** Rit
     * API for sending the booking request for the driver.
     * POST /sendBookingRequest
     * @param input 
     * @return Response
     * @internal param $drive_request_id
     */
    public function sendBookingRequest()
    {
    	try {
    		 
            $inputs       = Input::all();

            $inputs_array = $inputs;

            $generatedDriveCode = "VDR".bin2hex(openssl_random_pseudo_bytes(2));//16

            return $this->driveRequest->saveBookingRequest($generatedDriveCode, $inputs_array);
    	
    	} catch (Exception $e) {
    
    		$errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
    	}
    	
    }

    /** Rit
     * API for setting the start time for the drive.
     * GET /startDrive
     * @param input
     * @return Response
     * @internal param $driveDetails
     */
    public function startDrive()
    {
        try {
    
            $inputs       = Input::all();

            $inputs_array = $inputs;

            return $this->driveRequest->updateStartDriveTime($inputs_array);
    
        } catch (Exception $e) {
    
            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }
    }
    
    /** Rit
     * API for setting the end time for the drive.
     * GET /endDrive
     * @param input
     * @return Response
     * @internal param $driveDetails
     */
    public function endDrive()
    {
        try {

            $inputs          = Input::all();

            $inputs_array    = $inputs;

            return $this->driveRequest->updateEndDriveTime($inputs_array);
       
        } catch (Exception $e) {
    
            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }
        
    }
  
    
    /** Rit
     * API for showing the latest status to the customer after booking.
     * GET /showBookingStatusForCustomer
     * @param input
     * @return Response
     * @internal param $driveDetails
     */
    public function showBookingStatusForCustomer($customerId)
    {
    	try {

    		$driveDetails = DriveRequest::with('customer', 'pub')->where('customer_id', $customerId)
                                                                 ->orderBy('created_at', 'DESC')
                                                                 ->limit(5)
                                                                 ->get();
    		
    	} catch (Exception $e) {
    
    		$errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
    	}
        
    	return $driveDetails;
    }


    public function showAllBookingStatusForCustomer($customerId)
    {
        try {

            $limit   = Input::get('limit') ?: 10;

            $driveDetails = DriveRequest::with('customer', 'pub')->where('customer_id', $customerId)->paginate($limit);
            
        } catch (Exception $e) {
    
            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }
        
        return $driveDetails;
    }

    
    /** Rit
     * API for showing the latest status to the driver about the customer.
     * GET /showBookingStatusForDriver
     * @param
     * @return Response
     * @internal param $driveDetails
     */
    public function showBookingStatusForDriver($driverId)
    {
    	try {

            $limit   = Input::get('limit') ?: 10;
    		 
    		$driveDetails = DriveRequest::with('customer', 'pub')
                                          ->where('driver_id', $driverId)
                                          ->whereNotIn('status', ['Reqested', 'Completed'])
                                          ->paginate($limit);
    
    	} catch (Exception $e) {
    
    		$errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
    	}
        
    	return $driveDetails;
    }  
    
   
 
}