<?php

namespace App\Http\Controllers;

use Input, DB, App, Config, Mail;
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

            $inputs_array = $inputs['data'];
			
            $isEmailPhoneExist = CustomerRegistration::where('email', $inputs_array['email'])->orWhere('phone', '=', $inputs_array['phone'])->first();
                        
            if (is_null($isEmailPhoneExist)) {
            	
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
                if($isEmailPhoneExist->email == $inputs_array['email']){
            	  return $this->setStatusCode(500)->respondWithError("The account already exists with the e-mail: ".$inputs_array['email']);
                }else{
                  return $this->setStatusCode(500)->respondWithError("The account already exists with the phone: ".$inputs_array['phone']);
                }
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

    		$inputs_array = $inputs['data'];

    		$customer = CustomerRegistration::where('email', '=', $inputs_array['cred'])->orWhere('phone', '=', $inputs_array['cred'])->where('password', '=', md5($inputs_array['password']))->first();
	        
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

            $inputArray  = $inputs['data'];

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

            $inputArray = $inputs['data'];

            $customerEmail = $inputArray['email'];
            $Checkcustomer = CustomerRegistration::where('email', $customerEmail)->first();
            
            if(empty($Checkcustomer))
            {
                return $this->setStatusCode(404)->respondWithError("No customer exist with this Email Id");
            }
            else
            {
                //send reset pwd link to customer

                /*$customerID = $Checkcustomer->id;
                $Code       = md5(90*13+$customerID);

                $customer = array(
                        'receiver' => $customerEmail,
                    );

                $data = array(
                        'email'  => $customerEmail,
                        'Code'   => $Code,
                    );

                Mail::send('emails.forgotPassword', $data, function($message) use ($customer)
                {
                    $message->from(Config::get('app.admin_email'), 'Vdrive');
                    $message->to($customer['receiver'], $customer['receiver'])->subject('Reset your password');
                });*/

                return $this->setStatusCode(200)->respond("An email has been sent to the registered email id");

            }
        } catch (Exception $e) {

            return $this->setStatusCode(500)->respondWithError('Error occured! Please try later');
        }

    }


    public function resetPassword()
    {
        try {

            $input       = Input::all();
            $inputArray  = $input['data'];
            $NewPass     = $inputArray['Newpassword'];
            $Code        = $inputArray['Code'];

            $Checkcustomer   = DB::select('select id, email from users where md5(90*13+id) = ?', [$Code]);
            $CheckcustomerID = $Checkcustomer[0]->id;
            
            if($Checkcustomer == null)
            {
                return $this->setStatusCode(404)->respondWithError("Customer Dosen't Exist");
            }
            else
            {
                $Encpt = md5($NewPass);

                DB::table('customer_registration')
                         ->where('id', $CheckcustomerID)
                         ->update(array('password' => $Encpt));
                

                //Send email to user.

                /*$customer = array(
                        'receiver' => $Checkcustomer[0]->email,
                    );

                $data = array(
                        'email'  => $customerEmail
                    );

                Mail::send('emails.passwordChanged', $data, function($message) use ($customer)
                {
                    $message->from('admin@vdrive.com', 'Vdrive');
                    $message->to($customer['receiver'], $customer['receiver'])->subject('Password Changed');
                });*/

                return $this->setStatusCode(200)->respond("Reset Password Successful");
            }
            
        } catch (Exception $e) {

            return $this->setStatusCode(500)->respondWithError('Error occured! Please try later');
        }
    }

}

?>