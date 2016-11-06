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
        
        $driveRequest->drive_end_time    =  date("Y-m-d H:i:s");
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

            $driveEndedHour   = strtotime($driveDetails->drive_end_time);  

            $driveStartedDate = date('Y-m-d', strtotime($driveDetails->drive_start_time));

            $peak1From  = strtotime($driveStartedDate.' 07:00:00'); 
            $peak1To    = strtotime($driveStartedDate.' 10:00:00');
            $peak2From  = strtotime($driveStartedDate.' 17:00:00'); 
            $peak2To    = strtotime($driveStartedDate.' 21:00:00');

            $normalFrom = strtotime($driveStartedDate.' 10:00:00'); 
            $normalTo   = strtotime($driveStartedDate.' 17:00:00');

            $nightFrom  = strtotime($driveStartedDate.' 21:00:00'); 
            $nightTo    = strtotime(date('Y-m-d H:i:s',strtotime('+1 day', strtotime($driveStartedDate.' 07:00:00'))));

            if(($driveStartedHour >= $peak1From && $driveEndedHour <= $peak1To) || 
               ($driveStartedHour >= $peak2From && $driveEndedHour <= $peak2To)){
            
                return $this->calculateCharges(Config::get('pub')['hour_charge']['peak_hour'], 
                                               $this->calculateTotalMinutes($driveStartedHour, $driveEndedHour), 
                                               Config::get('pub')['additional_hour_charge']['peak_hour']);

            }else if($driveStartedHour >= $normalFrom && $driveEndedHour <= $normalTo){

                return $this->calculateCharges(Config::get('pub')['hour_charge']['normal_hour'], 
                                               $this->calculateTotalMinutes($driveStartedHour, $driveEndedHour),
                                               Config::get('pub')['additional_hour_charge']['normal_hour']);

            }else if($driveStartedHour >= $nightFrom && $driveEndedHour <= $nightTo){

                return $this->calculateCharges(Config::get('pub')['hour_charge']['night_hour'], 
                                               $this->calculateTotalMinutes($driveStartedHour, $driveEndedHour), 
                                               Config::get('pub')['additional_hour_charge']['night_hour']);

            }else{

                if($driveStartedHour >= $peak1From && $driveStartedHour <= $peak1To){

                       $peakMinutes = $this->calculateTotalMinutes($driveStartedHour, $peak1To);

                       $remainingHourPeakMinutes = 0; $extraMinutes = 0; $totalPeakPrice = 0; $totalExtraPrice = 0;

                        if($peakMinutes > 60)
                        {
                            $remainingHourPeakMinutes = $peakMinutes - 60;
                        }else{
                            $firstHourPeakMinutes = $peakMinutes;
                        }

                        if($remainingHourPeakMinutes == 0)
                        {

                            $billingDetails1 =  [
                                                  
                                                    [
                                                        'price_breakup' => 'First hour charge', 
                                                        'quantity'      => 1, 
                                                        'unit_price'    => Config::get('pub')['hour_charge']['peak_hour'], 
                                                        'total_price'   => Config::get('pub')['hour_charge']['peak_hour']
                                                    ]
                                               ];

                            $totalPeakPrice = Config::get('pub')['hour_charge']['peak_hour'];

                        }else{

                            $billingDetails1 = [
                                                 
                                                    [
                                                        'price_breakup' => 'First hour charge', 
                                                        'quantity'      => 1, 
                                                        'unit_price'    => Config::get('pub')['hour_charge']['peak_hour'], 
                                                        'total_price'   => Config::get('pub')['hour_charge']['peak_hour']
                                                    ],
                                                 
                                                    [
                                                        'price_breakup' => 'Rate after first hour peak hours', 
                                                        'quantity'      => $remainingHourPeakMinutes, 
                                                        'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                        'total_price'   => $remainingHourPeakMinutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                    ]
                                               ];

                            $totalPeakPrice = Config::get('pub')['hour_charge']['peak_hour'] + $remainingHourPeakMinutes * Config::get('pub')['additional_hour_charge']['peak_hour'];
                        }

                        if($driveEndedHour <= $normalTo)
                        { 
                            $normalMinutes  = $this->calculateTotalMinutes($normalFrom, $driveEndedHour);

                            $extraMinutes   = $normalMinutes; 

                            $totalExtraPrice = $normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour'];

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour normal hours', 
                                                    'quantity'      => $normalMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['normal_hour'], 
                                                    'total_price'   => $normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']
                                                 ]
                                               ];

                        }else if($driveEndedHour <= $peak2To){
                        
                            $normalMinutes = $this->calculateTotalMinutes($normalFrom, $normalTo);
                            $peak2Minutes  = $this->calculateTotalMinutes($peak2From, $driveEndedHour);

                            $extraMinutes  = $normalMinutes + $peak2Minutes; 

                            $totalExtraPrice = ($normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']) + ($peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']);

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour normal hours', 
                                                    'quantity'      => $normalMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['normal_hour'], 
                                                    'total_price'   => $normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak2Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ]
                                               ];

                        }else if($driveEndedHour <= $nightTo){
                            
                            $normalMinutes = $this->calculateTotalMinutes($normalFrom, $normalTo);
                            $peak2Minutes  = $this->calculateTotalMinutes($peak2From, $peak2To);
                            $nightMinutes  = $this->calculateTotalMinutes($nightFrom, $driveEndedHour);

                            $extraMinutes  =  $normalMinutes + $peak2Minutes + $nightMinutes;

                            $totalExtraPrice = ($normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']) + ($peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']) + ($nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']);

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour normal hours', 
                                                    'quantity'      => $normalMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['normal_hour'], 
                                                    'total_price'   => $normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak2Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour night hours', 
                                                    'quantity'      => $nightMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['night_hour'], 
                                                    'total_price'   => $nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']
                                                 ],
                                               ];

                        }

                        $totalMinutes = $peakMinutes + $extraMinutes;

                        $totalCalculatedAmount = $totalPeakPrice + $totalExtraPrice;

                        $billingDetails = array_merge($billingDetails1, $billingDetails2);

                        return [$totalMinutes, $totalCalculatedAmount, $billingDetails];

                
                }else if($driveStartedHour >= $peak2From && $driveStartedHour <= $peak2To){

                       $peakMinutes = $this->calculateTotalMinutes($driveStartedHour, $peak2To);

                       $remainingHourPeakMinutes = 0; $extraMinutes = 0; $totalPeakPrice = 0; $totalExtraPrice = 0;

                        if($peakMinutes > 60)
                        {
                            $remainingHourPeakMinutes = $peakMinutes - 60;
                        }else{
                            $firstHourPeakMinutes = $peakMinutes;
                        }

                        if($remainingHourPeakMinutes == 0)
                        {

                            $billingDetails1 =  [
                                                  
                                                    [
                                                        'price_breakup' => 'First hour charge', 
                                                        'quantity'      => 1, 
                                                        'unit_price'    => Config::get('pub')['hour_charge']['peak_hour'], 
                                                        'total_price'   => Config::get('pub')['hour_charge']['peak_hour']
                                                    ]
                                               ];

                            $totalPeakPrice = Config::get('pub')['hour_charge']['peak_hour'];

                        }else{

                            $billingDetails1 = [
                                                 
                                                    [
                                                        'price_breakup' => 'First hour charge', 
                                                        'quantity'      => 1, 
                                                        'unit_price'    => Config::get('pub')['hour_charge']['peak_hour'], 
                                                        'total_price'   => Config::get('pub')['hour_charge']['peak_hour']
                                                    ],
                                                 
                                                    [
                                                        'price_breakup' => 'Rate after first hour peak hours', 
                                                        'quantity'      => $remainingHourPeakMinutes, 
                                                        'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                        'total_price'   => $remainingHourPeakMinutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                    ]
                                               ];

                            $totalPeakPrice = Config::get('pub')['hour_charge']['peak_hour'] + $remainingHourPeakMinutes * Config::get('pub')['additional_hour_charge']['peak_hour'];
                        }

                        if($driveEndedHour <= $nightTo)
                        { 
                            $nightMinutes  = $this->calculateTotalMinutes($nightFrom, $driveEndedHour);

                            $extraMinutes   = $nightMinutes; 

                            $totalExtraPrice = $nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour'];

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour night hours', 
                                                    'quantity'      => $nightMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['night_hour'], 
                                                    'total_price'   => $nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']
                                                 ]
                                               ];

                        }else if($driveEndedHour <= strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1To)))){
                        
                            $nightMinutes = $this->calculateTotalMinutes($nightFrom, $nightTo);
                            $peak1Minutes = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1From))), $driveEndedHour);

                            $extraMinutes  = $nightMinutes + $peak1Minutes; 

                            $totalExtraPrice = ($nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']) + ($peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']);

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour night hours', 
                                                    'quantity'      => $nightMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['night_hour'], 
                                                    'total_price'   => $nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak1Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ]
                                               ];

                        }else if($driveEndedHour <= strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $normalTo)))){
                            
                            $nightMinutes  = $this->calculateTotalMinutes($nightFrom, $nightTo);
                            $peak1Minutes  = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1From))), strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1To))));
                            $normalMinutes = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $normalFrom))), $driveEndedHour);

                            $extraMinutes  =  $nightMinutes + $peak1Minutes + $normalMinutes;

                            $totalExtraPrice = ($nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']) + ($peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']) + ($normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']);

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour night hours', 
                                                    'quantity'      => $nightMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['night_hour'], 
                                                    'total_price'   => $nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak1Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour normal hours', 
                                                    'quantity'      => $normalMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['normal_hour'], 
                                                    'total_price'   => $normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']
                                                 ],
                                               ];

                        }

                        $totalMinutes = $peakMinutes + $extraMinutes;

                        $totalCalculatedAmount = $totalPeakPrice + $totalExtraPrice;

                        $billingDetails = array_merge($billingDetails1, $billingDetails2);

                        return [$totalMinutes, $totalCalculatedAmount, $billingDetails];


                }else if($driveStartedHour >= $normalFrom && $driveStartedHour <= $normalTo){

                       $normalMinutes = $this->calculateTotalMinutes($driveStartedHour, $normalTo);

                       $remainingHourNormalMinutes = 0; $extraMinutes = 0; $totalNormalPrice = 0; $totalExtraPrice = 0;

                        if($normalMinutes > 60)
                        {
                            $remainingHourNormalMinutes = $normalMinutes - 60;
                        }else{
                            $firstHourNormalMinutes = $normalMinutes;
                        }

                        if($remainingHourNormalMinutes == 0)
                        {

                            $billingDetails1 =  [
                                                  
                                                    [
                                                        'price_breakup' => 'First hour charge', 
                                                        'quantity'      => 1, 
                                                        'unit_price'    => Config::get('pub')['hour_charge']['normal_hour'], 
                                                        'total_price'   => Config::get('pub')['hour_charge']['normal_hour']
                                                    ]
                                               ];

                            $totalNormalPrice = Config::get('pub')['hour_charge']['normal_hour'];

                        }else{

                            $billingDetails1 = [
                                                 
                                                    [
                                                        'price_breakup' => 'First hour charge', 
                                                        'quantity'      => 1, 
                                                        'unit_price'    => Config::get('pub')['hour_charge']['normal_hour'], 
                                                        'total_price'   => Config::get('pub')['hour_charge']['normal_hour']
                                                    ],
                                                 
                                                    [
                                                        'price_breakup' => 'Rate after first hour normal hours', 
                                                        'quantity'      => $remainingHourNormalMinutes, 
                                                        'unit_price'    => Config::get('pub')['additional_hour_charge']['normal_hour'], 
                                                        'total_price'   => $remainingHourNormalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']
                                                    ]
                                               ];

                            $totalNormalPrice = Config::get('pub')['hour_charge']['normal_hour'] + $remainingHourNormalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour'];
                        }

                        if($driveEndedHour <= $peak2To)
                        { 
                            $peak2Minutes  = $this->calculateTotalMinutes($peak2From, $driveEndedHour);

                            $extraMinutes  = $peak2Minutes; 

                            $totalExtraPrice = $peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour'];

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak2Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ]
                                               ];

                        }else if($driveEndedHour <= $nightTo){
                         
                            $peak2Minutes  = $this->calculateTotalMinutes($peak2From, $peak2To);
                            $nightMinutes  = $this->calculateTotalMinutes($nightFrom, $driveEndedHour);

                            $extraMinutes  = $peak2Minutes + $nightMinutes; 

                            $totalExtraPrice = ($peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']) + ($nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']);

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak2Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour night hours', 
                                                    'quantity'      => $nightMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['night_hour'], 
                                                    'total_price'   => $nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']
                                                 ]
                                               ];

                        }else if($driveEndedHour <= strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1To)))){
                          
                            $peak2Minutes  = $this->calculateTotalMinutes($peak2From, $peak2To);
                            $nightMinutes  = $this->calculateTotalMinutes($nightFrom, $nightTo);
                            $peak1Minutes  = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1From))), $driveEndedHour);

                            $extraMinutes  = $peak2Minutes + $nightMinutes + $peak1Minutes;

                            $totalExtraPrice = ($peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']) + ($nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']) + ($peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']);

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak2Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour night hours', 
                                                    'quantity'      => $nightMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['night_hour'], 
                                                    'total_price'   => $nightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak1Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ],
                                               ];

                        }

                        $totalMinutes = $normalMinutes + $extraMinutes;

                        $totalCalculatedAmount = $totalNormalPrice + $totalExtraPrice;

                        $billingDetails = array_merge($billingDetails1, $billingDetails2);

                        return [$totalMinutes, $totalCalculatedAmount, $billingDetails];


                }else if($driveStartedHour >= $nightFrom && $driveStartedHour <= $nightTo){


                        $nightMinutes = $this->calculateTotalMinutes($driveStartedHour, $nightTo);

                        $remainingHourNightMinutes = 0; $extraMinutes = 0; $totalNightPrice = 0; $totalExtraPrice = 0;

                        if($nightMinutes > 60)
                        {
                            $remainingHourNightMinutes = $nightMinutes - 60;
                        }else{
                            $firstHourNightMinutes = $nightMinutes;
                        }

                        if($remainingHourNightMinutes == 0)
                        {

                            $billingDetails1 =  [
                                                  
                                                    [
                                                        'price_breakup' => 'First hour charge', 
                                                        'quantity'      => 1, 
                                                        'unit_price'    => Config::get('pub')['hour_charge']['night_hour'], 
                                                        'total_price'   => Config::get('pub')['hour_charge']['night_hour']
                                                    ]
                                               ];

                            $totalNightPrice = Config::get('pub')['hour_charge']['normal_hour'];

                        }else{

                            $billingDetails1 = [
                                                 
                                                    [
                                                        'price_breakup' => 'First hour charge', 
                                                        'quantity'      => 1, 
                                                        'unit_price'    => Config::get('pub')['hour_charge']['night_hour'], 
                                                        'total_price'   => Config::get('pub')['hour_charge']['night_hour']
                                                    ],
                                                 
                                                    [
                                                        'price_breakup' => 'Rate after first hour night hours', 
                                                        'quantity'      => $remainingHourNightMinutes, 
                                                        'unit_price'    => Config::get('pub')['additional_hour_charge']['night_hour'], 
                                                        'total_price'   => $remainingHourNightMinutes * Config::get('pub')['additional_hour_charge']['night_hour']
                                                    ]
                                               ];

                            $totalNightPrice = Config::get('pub')['hour_charge']['night_hour'] + $remainingHourNightMinutes * Config::get('pub')['additional_hour_charge']['night_hour'];
                        }

                        if($driveEndedHour <= strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1To))))
                        { 
                            $peak1Minutes  = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1From))), $driveEndedHour);

                            $extraMinutes  = $peak1Minutes; 

                            $totalExtraPrice = $peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour'];

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak1Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ]
                                               ];

                        }else if($driveEndedHour <= strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $normalTo)))){
                        
                            $peak1Minutes  = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1From))), strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1To))));
                            $normalMinutes = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $normalFrom))), $driveEndedHour);

                            $extraMinutes  = $peak1Minutes + $normalMinutes; 

                            $totalExtraPrice = ($peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']) + ($normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']);

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak1Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour normal hours', 
                                                    'quantity'      => $normalMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['normal_hour'], 
                                                    'total_price'   => $normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']
                                                 ]
                                               ];

                        }else if($driveEndedHour <= strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak2To)))){

                            $peak1Minutes  = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1From))), strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak1To))));
                            $normalMinutes = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $normalFrom))), strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $normalTo))));
                            $peak2Minutes  = $this->calculateTotalMinutes(strtotime(date('Y-m-d H:i:s',strtotime('+1 day', $peak2From))), $driveEndedHour);

                            $extraMinutes  = $peak1Minutes + $normalMinutes + $peak2Minutes;

                            $totalExtraPrice = ($peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']) + ($normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']) + ($peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']);

                            $billingDetails2 = [ 
                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak1Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak1Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour normal hours', 
                                                    'quantity'      => $normalMinutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['normal_hour'], 
                                                    'total_price'   => $normalMinutes * Config::get('pub')['additional_hour_charge']['normal_hour']
                                                 ],

                                                 [
                                                    'price_breakup' => 'Rate after first hour peak hours', 
                                                    'quantity'      => $peak2Minutes, 
                                                    'unit_price'    => Config::get('pub')['additional_hour_charge']['peak_hour'], 
                                                    'total_price'   => $peak2Minutes * Config::get('pub')['additional_hour_charge']['peak_hour']
                                                 ],
                                               ];

                        }

                        $totalMinutes = $nightMinutes + $extraMinutes;

                        $totalCalculatedAmount = $totalNightPrice + $totalExtraPrice;

                        $billingDetails = array_merge($billingDetails1, $billingDetails2);

                        return [$totalMinutes, $totalCalculatedAmount, $billingDetails];

                }

            }
        
        }catch(Exception $e){

            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);

        }

    }


    public function calculateTotalMinutes($start_time, $end_time)
    {
        try {
            
            $interval     = abs($start_time - $end_time);
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

            if($balanceMinute == 0)
            {

                $billingDetails =  [
                                     
                                        [
                                            'price_breakup' => 'First hour charge', 
                                            'quantity'      => 1, 
                                            'unit_price'    => $firstHourCharge, 
                                            'total_price'   => $firstHourCharge
                                        ]
                                   ];

            }else{

                $billingDetails = [
                                     
                                        [
                                            'price_breakup' => 'First hour charge', 
                                            'quantity'      => 1, 
                                            'unit_price'    => $firstHourCharge, 
                                            'total_price'   => $firstHourCharge
                                        ],
                                     
                                        [
                                            'price_breakup' => 'Rate after first hour', 
                                            'quantity'      => $balanceMinute, 
                                            'unit_price'    => $ratePerMinutes, 
                                            'total_price'   => $balanceMinute * $ratePerMinutes
                                        ]
                                   ];

            }
    
        } catch (Exception $e) {
    
            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

        return [$totalMinutes, $totalCalculatedAmount, $billingDetails];
    }


    public function saveBillingDetails($driveDetails, $total_time_rate_charge)
    {

        foreach ($total_time_rate_charge[2] as $key => $value) {

            $billing = new Billing();

            $billing->drive_request_id = $driveDetails->id;
            $billing->price_breakup    = $value['price_breakup'];
            $billing->quantity         = $value['quantity'];
            $billing->unit_price       = $value['unit_price'];
            $billing->total_price      = $value['total_price'];
            
            $billing-> save();

        }

    }

}




?>