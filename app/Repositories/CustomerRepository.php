<?php

namespace App\Repositories;

use App\Models\CustomerRegistration;

class CustomerRepository{


	public function signUp($input)
    {
        $customer = new CustomerRegistration();
        
        $customer->name     = $input['name'];
        $customer->email    = $input['email'];
        $customer->phone    = $input['phone'];
        $customer->password = md5($input['password']);

        $customer->save();

        return $customer;
    }


}


?>