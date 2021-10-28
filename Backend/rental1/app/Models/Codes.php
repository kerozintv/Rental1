<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Codes extends Model
{
    protected $fillable = [

        'code_type',
        'code',



    ];

    public $timestamps = false;
    use HasFactory;
}
