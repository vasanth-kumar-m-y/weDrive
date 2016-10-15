<?php

namespace App\Repositories;

use Input, DB, App, Config;
use App\Models\DriveRequest;
use App\Models\Billing;

class DriveRequestRepository{

	public function saveBookingRequest($generatedDriveCode, $inputs_array)
	{
	    $driveRequest = new DriveRequest();

        $driveRequest->drive_code 	           = $generatedDriveCode;
	    $driveRequest->customer_id 	           = $inputs_array['customer_id'];
		$driveRequest->pub_id                  = $inputs_array['pub_id'];
		$driveRequest->car_type_id 	           = $inputs_array['car_type_id'];
        $driveRequest->transmission_id         = $inputs_array['transmission_id'];
        $driveRequest->terms_and_cond_accepted = $inputs_array['terms_and_cond_accepted'];
		$driveRequest->device_id 	           = $inputs_array['device_id'];
		$driveRequest->booking_date_time       = date('Y-m-d H:i:s');
		$driveRequest->status 		           = "Requested";

        $driveRequest-> save();

        return $driveRequest;
	}


	public function updateStartDriveTime($inputs_array)
	{
          
        $driveRequest = DriveRequest::find($inputs_array['driveId']);

        $driveRequest->drive_start_time = date("Y-m-d H:i:s"); 
        $driveRequest->status           = "Started";         

        $driveRequest-> save();

        return $driveRequest;
	}


	public function updateEndDriveTime($inputs_array)
	{
	    $driveRequest = DriveRequest::find($inputs_array['driveId']);
        
        $driveRequest->drive_end_time    = date("Y-m-d H:i:s");
        $driveRequest->status            = "Ended";

        $total_time_rate_charge = $this->findTotalDriveRateAmount($driveRequest);

        $driveRequest->total_travel_time = $total_time_rate_charge[0];
        $driveRequest->total_drive_rate  = $total_time_rate_charge[1];

        $driveRequest-> save();

        $this->saveBillingDetails($driveRequest, $total_time_rate_charge);

        return $driveRequest;
	}



    public function findTotalDriveRateAmount($driveDetails)
    {

        try{

            $driveStartedHour = strtotime($driveDetails->drive_start_time); 

            $driveStartedDate = date('Y-m-d', strtotime($driveDetails->drive_start_time));

            $peak1From  = strtotime($driveStartedDate.' 07:00:00'); 
            $peak1To    = strtotime($driveStartedDate.' 10:00:00');
            $peak2From  = strtotime($driveStartedDate.' 17:00:00'); 
            $peak2To    = strtotime($driveStartedDate.' 21:00:00');

            $normalFrom = strtotime($driveStartedDate.' 10:00:00'); 
            $normalTo   = strtotime($driveStartedDate.' 17:00:00');

            $nightFrom  = strtotime($driveStartedDate.' 21:00:00'); 
            $nightTo    = strtotime($driveStartedDate.' 07:00:00');

            if(($driveStartedHour >= $peak1From && $driveStartedHour < $peak1To) || ($driveStartedHour > $peak2From && $driveStartedHour < $peak2To))
            {

                return $this->calculateCharges(150, $this->calculateTotalMinutes($driveDetails), 3);

            }else if($driveStartedHour >= $normalFrom && $driveStartedHour <= $normalTo){

                return $this->calculateCharges(100, $this->calculateTotalMinutes($driveDetails), 2.5);

            }else if($driveStartedHour >= $nightFrom && $driveStartedHour > $nightTo){

                return $this->calculateCharges(250, $this->calculateTotalMinutes($driveDetails), 4);

            }
        
        }catch(Exception $e){

            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);

        }

    }


    public function calculateTotalMinutes($driveDetails)
    {
        try {
            
            $interval     = abs(strtotime($driveDetails->drive_start_time) - strtotime($driveDetails->drive_end_time));
            $totalMinutes = round($interval / 60);        
          
        } catch (Exception $e) {
    
            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

        return $totalMinutes;
    }


    public function calculateCharges($firstHourCharge, $totalMinutes, $ratePerMinutes)
    {
        try {

            $balanceMinute = 0;

            if($totalMinutes > 60){
                $balanceMinute = $totalMinutes - 60;
            }
            
            $totalCalculatedAmount = $firstHourCharge + ($balanceMinute * $ratePerMinutes);
    
        } catch (Exception $e) {
    
            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

        return [$totalMinutes, $totalCalculatedAmount, $ratePerMinutes];
    }


    public function saveBillingDetails($driveDetails, $total_time_rate_charge)
    {

        $billing = Billing::where('drive_request_id', '=', $driveDetails->id)->first();

        if (!empty($billing)) 
        {
          $billing = Billing::find($billing->id);
        }else{
          $billing = new Billing();
        }

        $billing->drive_request_id = $driveDetails->id;
        $billing->price_breakup    = '';
        $billing->quantity         = $driveDetails->total_travel_time;
        $billing->unit_price       = $total_time_rate_charge[2];
        $billing->total_price      = $driveDetails->total_drive_rate;
        
        $billing-> save();

    }

}




?>