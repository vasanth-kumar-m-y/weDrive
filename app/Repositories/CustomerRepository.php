<?php

namespace App\Repositories;

use App\Models\CustomerRegistration;

class CustomerRepository{


	public function signUp($input)
    {
        $customer = new CustomerRegistration();
        
        $customer->name     = array_get($input, 'name');
        $customer->email    = array_get($input, 'email');
        $customer->phone    = array_get($input, 'phone');
        $customer->password = md5(array_get($input, 'password'));

        $customer->save();

        return $customer;
    }


}


?>