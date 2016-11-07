<?php

namespace App\Models;

class DriveRequest extends \Eloquent {

	protected $table    = 'drive_request';
	//public $timestamps  = false;
	protected $fillable = [];


	public function customer()
    {
        return $this->belongsTo('App\Models\CustomerRegistration', 'customer_id', 'id');
    }


    public function pub()
    {
        return $this->belongsTo('App\Models\PubMaster', 'pub_id', 'id');
    }


    public function driver()
    {
        return $this->belongsTo('App\Models\DriverRegistration', 'driver_id', 'id');
    }


    public function billing()
    {
        return $this->hasMany('App\Models\Billing', 'drive_request_id', 'id');
    }


}