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
            	     $response = [
                       'status'  => true,
                       'code' => 200,
                       'customer' => $customer
                     ];
                    return json_encode($response);
            	} else {
            		$response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'Customer registration failed.'
                     ];
                    return json_encode($response);
            	}
            }else{
                if($isEmailPhoneExist->email == $inputs_array['email']){
            	   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'The account already exists with the e-mail id: '.$inputs_array['email']
                     ];
                    return json_encode($response);
                }else{
                   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'The account already exists with the phone number: '.$inputs_array['phone']
                     ];
                    return json_encode($response);
                }
            }
      
        } catch (Exception $e) {
            $response = [
                       'status'  => false,
                       'code' => 501,
                       'message' =>  'Error occured! Please try later'
                     ];
            return json_encode($response);
        }
    }


    public function signIn()
    {
    	try{

    		$inputs = Input::all();

    		$inputs_array = $inputs['data'];

        $cred = $inputs_array['cred'];

        $customer = CustomerRegistration::where('password', '=', md5($inputs_array['password']))
                                          ->where(function($query) use ($cred){
                                              $query->where('email',   '=', $cred);
                                              $query->orWhere('phone', '=', $cred);
                                          })
                                          ->first();
	        
        	if (!empty($customer)) {
        	       $response = [
                       'status'  => true,
                       'code' => 200,
                       'customer' => $customer
                     ];
                    return $response;
        	
        	} else {
        		 $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'Customer authentication failed.'
                     ];
                    return $response;
        	}

    	}catch(Exception $e){
    		$response = [
                       'status'  => false,
                       'code' => 501,
                       'message' =>  'Error occured! Please try later'
                     ];
            return json_encode($response);

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

                $response = [
                       'status'  => true,
                       'code' => 200,
                       'message' => 'Password Changed Successfully'
                     ];
                    return json_encode($response);
            }else{
                   $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'Invalid Old Password'
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

    
    public function forgotPassword()
    {
        try {

            $inputs = Input::all();

            $inputArray = $inputs['data'];

            $customerEmail = $inputArray['email'];
            $Checkcustomer = CustomerRegistration::where('email', $customerEmail)->first();
            
            if(empty($Checkcustomer))
            {
                 $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'No customer exist with this Email Id'
                     ];
                    return json_encode($response);
            }
            else
            {
                //generate new pwd and send mail to customer

                $customerID = $Checkcustomer->id;
                $newPwd     = $this->getUniquePwd(9, $customerID);
               
                $Encpt = md5($newPwd);

                DB::table('customer_registration')
                         ->where('id', $customerID)
                         ->update(array('password' => $Encpt));

                $customer = array(
                        'receiver' => $customerEmail,
                        'name'     => $Checkcustomer->name,
                    );

                $data = array(
                        'email'  => $customerEmail,
                        'newPwd' => $newPwd,
                    );

                Mail::send('emails.forgotPassword', $data, function($message) use ($customer)
                {
                    $message->to($customer['receiver'], $customer['name'])->subject('Your New Password');
                });

                 $response = [
                       'status'  => true,
                       'code' => 200,
                       'message' => 'An email has been sent to the registered email id'
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


    public function getUniquePwd($size, $customerID)
    {

        $alpha_key = '';
        $keys = range('A', 'Z');

        for ($i = 0; $i < 2; $i++) {
          $alpha_key .= $keys[array_rand($keys)];
        }

        $length = $size - 2;

        $key = '';
        $keys = range(0, 9);

        for ($i = 0; $i < $length; $i++) {
          $key .= $keys[array_rand($keys)];
        }

        return $alpha_key . $customerID . $key;

    }


    /*public function resetPassword()
    {
        try {

            $input       = Input::all();
            $inputArray  = $input['data'];
            $NewPass     = $inputArray['Newpassword'];
            $Code        = $inputArray['Code'];

            $Checkcustomer   = DB::select('select * from users where md5(90*13+id) = ?', [$Code]);
            $CheckcustomerID = $Checkcustomer[0]->id;
            
            if($Checkcustomer == null)
            {
                $response = [
                       'status'  => false,
                       'code' => 401,
                       'message' => 'Customer Dosent Exist'
                     ];
                    return json_encode($response);  
            }
            else
            {
                $Encpt = md5($NewPass);

                DB::table('customer_registration')
                         ->where('id', $CheckcustomerID)
                         ->update(array('password' => $Encpt));
                

                //Send email to user.

                $customer = array(
                        'receiver' => $Checkcustomer[0]->email,
                        'name'     => $Checkcustomer[0]->name,
                    );

                $data = array(
                        'email'  => $customerEmail
                    );

                Mail::send('emails.passwordChanged', $data, function($message) use ($customer)
                {
                    $message->to($customer['receiver'], $customer['name'])->subject('Password Changed');
                });

                $response = [
                       'status'  => true,
                       'code' => 200,
                       'message' => 'Reset Password Successful'
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
    }*/


    public function signOut($id)
    {

      try {

        $customer = CustomerRegistration::find($id);

        if(empty($customer)){

          $response =  [
                       'status'  => false,
                       'code'     => 401,
                       'message' => 'No customer exist with this Id'
                     ];
                    return json_encode($response);

        }else{

          $response =  [
                         'status'   => true,
                         'code'     => 200,
                         'customer' => $customer,
                         'message'  => 'Logged out successfully!'
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


}

?>