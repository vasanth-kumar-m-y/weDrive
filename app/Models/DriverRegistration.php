<?php
namespace App\Models;

class DriverRegistration extends \Eloquent {
	protected $fillable = ['driver_code', 'first_name','last_name', 'phone_number','email_id','status','licence_no','car_type','profile_image'];

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'driver_registration';

	

	public function address()
    {
        return $this->belongsTo('DriverAddress', 'id', 'driver_id');
    }
}