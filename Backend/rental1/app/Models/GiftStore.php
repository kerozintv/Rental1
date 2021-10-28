<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiftStore extends Model
{

    protected $fillable = [

        'item_name',
        'item_picture',
        'item_price',
        'item_remaining',



    ];

    public $timestamps = false;








    use HasFactory;
}
