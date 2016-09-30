<?php

namespace App\Repositories;

use Input, DB, App, Config;
use App\Models\DriverRegistration;
use App\Models\DriverAddress;

class DriverRegistrationRepository{

	public function registerDriver($generatedDriverCode, $inputs_array)
	{
            if(isset($inputs_array['driverId']))
            {
            
                  $driverRegistration = DriverRegistration::find($inputs_array['driverId']);
                  
                  $driverAddress      = DriverAddress::find((int)$driverRegistration["address"]->id);

            }else{

                  $driverRegistration = new DriverRegistration();
                  
                  $driverAddress      = new DriverAddress();

                  $driverRegistration->driver_code =  $generatedDriverCode;

            }
      
	      $driverRegistration->first_name 	        =  $inputs_array['firstname'];
	      $driverRegistration->last_name              =  $inputs_array['lastname'];
	      $driverRegistration->phone_number 	        =  $inputs_array['phonenumber'];
	      $driverRegistration->email_id 	        =  $inputs_array['email'];
            $driverRegistration->status                 =  "Offline";
            $driverRegistration->licence_no             =  $inputs_array['licenceno'];
	      $driverRegistration->transmission_type_id   =  $inputs_array['transmission_type'];
            $driverRegistration->profile_image          =  $inputs_array['profile_image'];
            $driverRegistration->dl_upload              =  $inputs_array['dl_upload'];
            $driverRegistration->address_proof_upload   =  $inputs_array['address_proof_upload'];
            $driverRegistration->id_proof_upload        =  $inputs_array['id_proof_upload'];


            $driverRegistration-> save();

            $driverAddress->driver_id =  $driverRegistration->id;
            $driverAddress->address1  =  $inputs_array['address1'];
            $driverAddress->address2  =  $inputs_array['address2'];
            $driverAddress->city      =  $inputs_array['city'];
            $driverAddress->pincode   =  $inputs_array['pincode'];
            $driverAddress->state     =  $inputs_array['state'];
            $driverAddress->country   =  $inputs_array['country'];
        
            $driverAddress-> save();

            return $driverRegistration;

	}



}




?>