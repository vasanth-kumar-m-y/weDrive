<?php
namespace App\Http\Controllers;

use Input, DB, App, Config;

use App\Models\PubMaster;
use App\Models\TransmissionType;
use App\Models\CarType;
use App\Models\Country;
use App\Models\State;
use Illuminate\Support\Facades\Mail;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class MasterController extends Controller
{


    public function __construct()
    {
       parent::__construct();
    }


    public function getAllPubs()
    {

        try{

            $pubs = PubMaster::get();
             $successResponse = $pubs;
               //  'status' => true,
                // 'pubs'   => $pubs,
            // ];

           // return $this->setStatusCode(200)->respond($successResponse);
            return $this->respond($successResponse);

            /*$successResponse = [
                 'status' => true,
                 'pubs'   => $pubs,
             ];

            return $this->setStatusCode(200)->respond($successResponse);*/

        }catch(Exception $e){

            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

    }


    public function getAllTransmissionType()
    {

        try{

            $transmissionTypes = TransmissionType::get();

            $successResponse = [
                 'status'            => true,
                 'transmissionTypes' => $transmissionTypes,
             ];

            return $this->setStatusCode(200)->respond($successResponse);

        }catch(Exception $e){

            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

    }


    public function getAllCarType()
    {

        try{

            $carTypes = CarType::get();

            $successResponse = [
                 'status'    => true,
                 'carTypes'  => $carTypes,
             ];

            return $this->setStatusCode(200)->respond($successResponse);

        }catch(Exception $e){

            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

    }

    
    public function getAllCountries()
    {

        try{

            $countries = Country::get();

            $successResponse = [
                 'status'    => true,
                 'countries' => $countries,
             ];

            return $this->setStatusCode(200)->respond($successResponse);

        }catch(Exception $e){

            $errorMessage = [
                'status' => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }

    }


    public function getAllStatesByCountry($countryId)
    {

        try{

            $states = State::where('country_id', $countryId)->get();

            $successResponse = [
                 'status' => true,
                 'states' => $states,
             ];

            return $this->setStatusCode(200)->respond($successResponse);

        }catch(Exception $e){

            $errorMessage = [
                'status'  => false,
                'message' => $e
            ];

            return $this->setStatusCode(500)->respondWithError($errorMessage);
        }
    }
   
 
}