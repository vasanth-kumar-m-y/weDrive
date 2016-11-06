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
            $inputs_array = $inputs['data'];
            
            $generatedDriveCode = "pubdrv-".bin2hex(openssl_random_pseudo_bytes(2));//16

             
            $driveRequest = $this->driveRequest->saveBookingRequest($generatedDriveCode, $inputs_array);

            if ($driveRequest->id) {
                 $response = [
                       'status'  => true,
                       'code' => 200,
                       'data' => $driveRequest,
                       'message' => 'Booking request sent successfully!'
                     ];
                    return json_encode($response);
                    
            }else{
                   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'Booking request failed'
                     ];
                    return json_encode($response); 
            }
    	  
    	} catch (Exception $e) {
            $response = [
                       'status'  => false,
                       'code' => 501,
                       'message' => 'Error occured! Please try later'
                     ];
            return json_encode($response); 
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

            $inputs_array = $inputs['data'];
            
            $driveRequest =  $this->driveRequest->updateStartDriveTime($inputs_array);

            if ($driveRequest->id) {
                 $response = [
                       'status'  => true,
                       'code' => 200,
                       'data' => $driveRequest,
                       'message' => 'Drive started successfully!'
                     ];
                    return json_encode($response);
            }else{
                   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'Failed while starting the drive'
                     ];
                    return json_encode($response); 
            }
        } catch (Exception $e) {
    
            $response = [
                       'status'  => false,
                       'code' => 501,
                       'message' => 'Error occured! Please try later'
                     ];
            return json_encode($response); 
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

            $inputs_array    = $inputs['data'];

            $driveRequest =  $this->driveRequest->updateEndDriveTime($inputs_array);

            if ($driveRequest->id) {
                 $response = [
                       'status'  => true,
                       'code' => 200,
                       'data' => $driveRequest,
                       'message' => 'Drive ended successfully!'
                     ];
                    return json_encode($response);
            }else{
                   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'Failed while ending the drive'
                     ];
                    return json_encode($response); 
            }
       
        } catch (Exception $e) {
    
            $response = [
                       'status'  => false,
                       'code' => 501,
                       'message' => 'Error occured! Please try later'
                     ];
            return json_encode($response);
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

    		$driveDetails = DriveRequest::with('customer', 'pub', 'driver', 'billing')
                                      ->where('customer_id', $customerId)
                                      ->orderBy('created_at', 'DESC')
                                      ->limit(5)
                                      ->get();

            if ($driveDetails->count() > 0) {
                 $response = [
                       'status'  => true,
                       'code' => 200,
                       'data' => $driveDetails,
                       'message' => 'Booking status fetched successfully!'
                     ];
                    return json_encode($response);
            }else{
                   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'There is no record found'
                     ];
                    return json_encode($response); 
            }                                                     
    		
    	} catch (Exception $e) {
    
    		$response = [
                       'status'  => false,
                       'code' => 501,
                       'message' => 'Error occured! Please try later'
                     ];
            return json_encode($response);
    	}
        
    }


    public function showAllBookingStatusForCustomer($customerId)
    {
        try {

            $limit   = Input::get('limit') ?: 10;

            $driveDetails = DriveRequest::with('customer', 'pub', 'driver', 'billing')
                                          ->where('customer_id', $customerId)
                                          ->paginate($limit);


            if ($driveDetails->count() > 0) {
              //$response = [$driveDetails];
               /*$response = [
                       'status'  => true,
                       'code' => 200,
                       $driveDetails
                     ]; */


               // return $response;
               // return $this->setStatusCode(200)->respond($driveDetails);
               return $driveDetails;
             }else{
                   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'There is no record found'
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
     * API for showing the latest status to the driver about the customer.
     * GET /showBookingStatusForDriver
     * @param
     * @return Response
     * @internal param $driveDetails
     */
    public function showBookingStatusForDriver($driverId)
    {
    	try {
    		 
    		$driveDetails = DriveRequest::with('customer', 'pub')
                                          ->where('driver_id', $driverId)
                                          ->whereNotIn('status', ['Reqested', 'Completed'])
                                          ->get();

            if ($driveDetails->count() > 0) {
                 $response = [
                       'status'  => true,
                       'code' => 200,
                       'data' => $driveDetails,
                       'message' => 'Booking status fetched successfully!'
                     ];
                    return json_encode($response);
            }else{
                   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'There is no record found'
                     ];
                    return json_encode($response); 
            }                                  
    
    	} catch (Exception $e) {
    
    		$response = [
                       'status'  => false,
                       'code' => 501,
                       'message' => 'Error occured! Please try later'
                     ];
            return json_encode($response);;
    	}

    }  
    
   
 
}