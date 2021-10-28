<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarRentals extends Model
{

    protected $fillable = [

        'kolcsonzes_id',
        'kolcsonzo_id',
        'kolcsonzo_vezeteknev',
        'kolcsonzo_keresztnev',
        'kolcsonzo_telefon',
        'statusz',
        'kolcsonzes_start',
        'kolcsonzes_end',
        'kolcsonzott_modell',
        'fizetendo',
        'duration_days'




    ];







    public $timestamps = false;

    use HasFactory;
}
