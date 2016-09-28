<?php

class DriverAddress extends \Eloquent {
	protected $table = 'driver_address';
	protected $fillable = ['driver_id', 'address1', 'address2', 'city', 'pincode', 'state','country'];
}