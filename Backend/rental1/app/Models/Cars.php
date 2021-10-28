<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cars extends Model
{

    protected $fillable = [

        'car_rental_begin',
        'car_rental_end',



    ];










    public $timestamps = false;

    use HasFactory;
}
