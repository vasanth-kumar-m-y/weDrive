<?php
namespace App\Models;

class DriverRegistration extends \Eloquent {
	protected $fillable = [];
    public $timestamps  = false;
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'driver_registration';

	

	public function address()
    {
        return $this->belongsTo('App\Models\DriverAddress', 'id', 'driver_id');
    }

    public function transmissionType()
    {
        return $this->hasOne('App\Models\TransmissionType', 'id', 'transmission_type_id');
    }
}