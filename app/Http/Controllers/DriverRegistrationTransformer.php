<?php

namespace App\Http\Controllers;

use App\Models\DriverRegistration;

/**
 * Created by PhpStorm.
 * User: Vishu Venki @CreativeThoughts
 * Date: 05/01/15
 * Time: 5:57 PM
 */
use League\Fractal;

class DriverRegistrationTransformer extends Fractal\TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param User|UserProfile $driver
     * @return array
     */
    public function transform(DriverRegistration $driver)
    {
        return [
            'id'    		    => (int) $driver['id'],
            'drivercode' 	    => $driver['driver_code'],
            'firstname' 	    => $driver['first_name'],
            'lastname' 		    => $driver['last_name'],
            'email' 		    => $driver['email_id'],
            'phonenumber' 	    => $driver['phone_number'],
            'licenceno' 	    => $driver['licence_no'],
            'transmission_type' => $driver->transmissionType['transmission_type'],
            'status'    	    => $driver['status'],
            'address1'   	    => $driver->address['address1'],
            'address2'   	    => $driver->address['address2'],
            'city'   		    => $driver->address['city'],
            'pincode'   	    => $driver->address['pincode'],
            'state'  		    => $driver->address['state'],
            'country'   	    => $driver->address['country']
        ];
    }
}