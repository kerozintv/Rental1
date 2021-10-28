<?php

namespace App\Http\Controllers;

use App\Models\CarRentals;
use App\Models\Cars;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RentalController extends Controller
{

    public function getUserRentals($user_id)
    {
        $url_userid = $user_id;

        $all_rentals = CarRentals::all();

        $user_rentals = $all_rentals->where('kolcsonzo_id', $url_userid);

        return response()->json([


            'user_rentals' => $user_rentals,




        ]);
    }






















    public function RentSubmit(Request $request)
    {

        $selected_car = Cars::where('id', $request->modell_id)->first();
        $selected_car_name = $selected_car->car_name;
        $selected_car_dp = $selected_car->car_down_payment;
        $selected_car_price = $selected_car->car_price;


        // Calculate payment

        $start_time = \Carbon\Carbon::parse($request->kolcsonzes_kezdete);
        $finish_time = \Carbon\Carbon::parse($request->kolcsonzes_vege);

        $time_diff = $start_time->diffInDays($finish_time, false);










        $fizetendo = $time_diff * $selected_car_price + $selected_car_dp;


        function generateRandomString($length = 10)
        {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }






        $validator = Validator::make($request->all(), [

            'v_nev' => 'required|max:191',
            'k_nev' => 'required|max:191',
            'phone' => 'required|min:9|max:9',
            'adat_checkbox' => 'required|accepted',
            'modell_id' => 'required',
            'kolcsonzes_kezdete' => 'required',
            'kolcsonzes_vege' => 'required|different:kolcsonzes_kezdete|after:kolcsonzes_kezdete',



        ]);


        $choosen_car = Cars::where('id', $request->modell_id)->first();

        $check_start = $choosen_car->car_rental_begin;
        $check_end = $choosen_car->car_rental_end;



        if ($validator->fails()) {

            return response()->json([

                'validation_errors' => $validator->messages(),
            ]);
        } else {

            $kolcsonzes_azonosito = generateRandomString(5);


            CarRentals::create([

                'kolcsonzes_id' =>  $kolcsonzes_azonosito,
                'kolcsonzo_vezeteknev' => $request->v_nev,
                'kolcsonzo_keresztnev' => $request->k_nev,
                'kolcsonzo_telefon' => $request->phone,
                'statusz' => 'Átvételre vár.',
                'kolcsonzo_id' => $request->user,
                'kolcsonzes_start' =>  $start_time,
                'kolcsonzes_end' => $finish_time,
                'kolcsonzott_modell' => $selected_car_name,
                'fizetendo' => $fizetendo,
                'duration_days' => $time_diff

            ]);

            Cars::where('car_name', $selected_car_name)->first()->update(['car_rental_begin' => $start_time]);
            Cars::where('car_name', $selected_car_name)->first()->update(['car_rental_end' => $finish_time]);


            return response()->json([
                'status' => 200,
                'message' =>  $kolcsonzes_azonosito . ' azonosító számú Kölcsönzését rögzítettük!',
            ]);
        }
    }
}
