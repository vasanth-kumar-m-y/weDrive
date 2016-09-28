<?php

namespace App\Http\Controllers;

use Input, DB, App, Config;
use App\Models\CustomerRegistration;
use App\Repositories\CustomerRepository;


class CustomerController extends Controller
{

    public function __construct(CustomerRepository $customerRepo)
    {
        parent::__construct();
    	$this->customerRepo = $customerRepo;
    }


    public function signUp()
    {
        try {

            $inputs = Input::all();

            $inputs_array = $inputs;
			
            $isEmailExist = CustomerRegistration::where('email', $inputs_array['email'])->first();
                        
            if (is_null($isEmailExist)) {
            	
            	$customer = $this->customerRepo->signUp($inputs_array);          	
            	
            	if ($customer->id) {
            	
            		$successResponse = [
            		   'status'  => true,
            		   'message' => 'Customer registered successfully!'
            		];
            		return $this->setStatusCode(200)->respond($successResponse);
            	
            	} else {
            		return $this->setStatusCode(500)->respondWithError("Customer registration failed.");
            	}
            }else{
            	return $this->setStatusCode(500)->respondWithError("The account already exists with the e-mail: ".$inputs_array['email']);
            }
      
        } catch (Exception $e) {

            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);

        }
    }


    public function signIn()
    {
    	try{

    		$inputs = Input::all();

    		$inputs_array = $inputs;

    		$customer = CustomerRegistration::where('email', '=', $inputs_array['email'])->where('password', '=', md5($inputs_array['password']))->first();
	        
        	if (!empty($customer)) {
        	
        		$successResponse = [
        		   'status'  => true,
        		   'message' => 'Customer authenticate successfully!'
        		];

        		return $this->setStatusCode(200)->respond($successResponse);
        	
        	} else {
        		return $this->setStatusCode(500)->respondWithError("Customer authenticate failed.");
        	}

    	}catch(Exception $e){

    		$errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);

    	}
              
    }


    public function changePassword()
    {
        try {

            $inputs = Input::all();

            $inputArray = $inputs;

            $customerid  = $inputArray['customerid'];
            $CurrentPass = $inputArray['current_password'];
            $NewPass     = $inputArray['new_password'];
            $ConfirmPass = $inputArray['confirm_password'];
            
            $OldPass     = DB::select('select password, email from customer_registration where id =?', [$customerid]);
            $OldPassword = $OldPass[0]->password;
           
            if (md5($CurrentPass) == $OldPassword) {
                
                $Encpt = md5($NewPass);

                DB::table('customer_registration')
                         ->where('id', $customerid)
                         ->update(array('password' => md5($NewPass)));

                return $this->setStatusCode(200)->respond("Password Changed Successfully");
            
            }else{

                return $this->setStatusCode(404)->respondWithError("Invalid Old Password");
            }
            
        } catch (Exception $e) {

            return $this->setStatusCode(500)->respondWithError('Error occured! Please try later');
        }
    }

    
    public function forgotPassword()
    {
        try {

            $inputs = Input::all();

            $inputArray = $inputs;

            $customerEmail = $inputArray['email'];
            $Checkcustomer = CustomerRegistration::where('email', $customerEmail)->first();
            
            if(empty($Checkcustomer))
            {
                return $this->setStatusCode(404)->respondWithError("No customer exist with this Emailid");
            }
            else
            {
                //send link to mail
                
                /*$customerID = $Checkcustomer->id;
                $Code       = md5(90*13+$customerID);

                $customer = array(
                        'sender'   => "admin@vdrive.com",
                        'receiver' => $customerEmail,
                    );

                $data = array(
                        'email'  => $customerEmail,
                        'Code'   => $Code,
                    );

                Mail::send('emails.forgotPassword', $data, function($message) use ($customer)
                {
                    $message->from('admin@vdrive.com', 'Vdrive');
                    $message->to($customer['receiver'], $customer['receiver'])->subject('Reset your password');
                });*/

                return $this->setStatusCode(200)->respond("An email has been sent to the registered emailid");

            }
        } catch (Exception $e) {

            return $e;//$this->setStatusCode(500)->respondWithError('Error occured! Please try later');
        }



    }

}

?>