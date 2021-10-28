<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarController extends Controller
{



    public function list()
    {



        $car_details = Cars::all();

        return response()->json([


            'status' => 200,
            'cars' => $car_details


        ]);
    }

    public function fetch_car_details($id)
    {

        $url_id = $id;
        $car_info = Cars::where('id', $url_id)->first();

        return response()->json([


            'status' => 200,
            'car_info' => $car_info,


        ]);
    }

    public function checkdates($model_id)
    {

        $url_model_id = $model_id;

        $selected_car = Cars::where('id', $model_id)->first();

        $car_start_date = $selected_car->car_rental_begin;
        $car_end_date = $selected_car->car_rental_end;
        $current_day = date("Y/m/d");

        $start_time = \Carbon\Carbon::parse($car_start_date);
        $finish_time = \Carbon\Carbon::parse($car_end_date);

        $current_day_parsed = \Carbon\Carbon::parse($current_day);

        if ($start_time &&  $finish_time !== null || $finish_time < $current_day_parsed) {


            return response()->json([


                'foglalt_start' => $car_start_date,
                'foglalt_end' => $car_end_date,


            ]);
        }
    }
}
