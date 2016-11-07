<?php
namespace App\Models;

class DriverRegistration extends \Eloquent {
	protected $fillable = [];
    //public $timestamps  = false;
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'driver_registration';

	

	public function address()
    {
        return $this->hasOne('App\Models\DriverAddress', 'driver_id', 'id');
    }

    public function transmissionType()
    {
        return $this->belongsTo('App\Models\TransmissionType', 'transmission_type_id', 'id');
    }
}