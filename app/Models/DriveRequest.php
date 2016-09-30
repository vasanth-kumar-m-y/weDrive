<?php

namespace App\Models;

class DriveRequest extends \Eloquent {

	protected $table    = 'drive_request';
	//public $timestamps  = false;
	protected $fillable = [];


	public function customer()
    {
        return $this->hasOne('App\Models\CustomerRegistration', 'id', 'customer_id');
    }


    public function pub()
    {
        return $this->hasOne('App\Models\PubMaster', 'id', 'pub_id');
    }


}