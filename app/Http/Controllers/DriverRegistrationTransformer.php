<?php

namespace App\Http\Controllers;
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
     * @param User|UserProfile $user
     * @return array
     */
    public function transform(DriverRegistration $user)
    {
        return [
            'id'    		=> (int) $user['id'],
            'drivercode' 	=> $user['driver_code'],
            'firstname' 	=> $user['first_name'],
            'lastname' 		=> $user['last_name'],
            'email' 		=> $user['email_id'],
            'phonenumber' 	=> $user['phone_number'],
            'licenceno' 	=> $user['licence_no'],
            'cartype' 		=> $user['car_type'],
            'status'    	=> $user['status'],
            'address1'   	=> $user->address['address1'],
            'address2'   	=> $user->address['address2'],
            'city'   		=> $user->address['city'],
            'pincode'   	=> $user->address['pincode'],
            'state'  		=> $user->address['state'],
            'country'   	=> $user->address['country']
        ];
    }
}