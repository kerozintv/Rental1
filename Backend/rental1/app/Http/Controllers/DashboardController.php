<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\Admins;
use App\Models\CarRentals;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class DashboardController extends Controller
{

    function kolcsonzesek()
    {
        $kolcsonzesek = CarRentals::orderBy('id', 'desc')->get();



        return response()->json([


            'kolcsonzesek' => $kolcsonzesek
        ]);
    }


    function editRow($row_id)
    {

        $selected_row = CarRentals::find($row_id);

        return response()->json([


            'selected_row' => $selected_row,
        ]);
    }














    function updateRow(Request $request)
    {


        function addPoints($row_id)
        {
            $car_rental = CarRentals::find($row_id);
            $duration = $car_rental->duration_days;
            $user_id = $car_rental->kolcsonzo_id;
            $user =  User::where('id', $user_id);


            if ($duration === 3) {

                $user->increment('husegpontok', 200);
            } else if ($duration === 4) {

                $user->increment('husegpontok', 250);
            } else if ($duration === 5) {

                $user->increment('husegpontok', 350);
            } else if ($duration === 6) {

                $user->increment('husegpontok', 500);
            } else if ($duration >= 7) {

                $user->increment('husegpontok', 1000);
            }
        }


        $row_id = $request->row_id;

        $selected_row = CarRentals::find($row_id);
        $selected_row->update([
            'kolcsonzo_vezeteknev' => $request->v_nev,
            'kolcsonzo_keresztnev' => $request->k_nev,
            'kolcsonzo_telefon' => $request->phone,
            'statusz' => $request->statusz,

        ]);

        if ($request->statusz === 'Kölcsönzés alatt.') {

            addPoints($row_id);
        }
    }












    function generateEmployeeId()
    {

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


        $worker_id = generateRandomString(6);

        return response()->json([


            'worker_id' => $worker_id,
        ]);
    }



    function addEmployee(Request $request)
    {

        $admin = Admins::create([

            'work_id' =>  $request->work_id,
            'vezetek_nev' => $request->v_nev,
            'kereszt_nev' => $request->k_nev,
            'work_password' => Hash::make($request->password),
        ]);

        $token = $admin->createToken($admin->work_id . '_Token')->plainTextToken;
    }


    function deleteEmployee($id)
    {
        $selected_worker = Admins::find($id);
        $selected_worker->delete();
    }


    function getEmployeeDetails()
    {

        $employees = Admins::all();

        return response()->json([


            'employees' => $employees,
        ]);
    }


    function getOverviewData()
    {

        $heti_osszes = CarRentals::whereBetween('kolcsonzes_start', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->get();
        $heti_db = $heti_osszes->count();
        $heti_fizetendok = $heti_osszes->pluck('fizetendo');
        $heti_bevetel = $heti_fizetendok->sum();
        $kolcsonzott_modellek = $heti_osszes->pluck('kolcsonzott_modell')->toArray();



        return response()->json([


            'heti_db' => $heti_db,
            'heti_bevetel' => $heti_bevetel,
            'kolcsonzott_modellek' => $kolcsonzott_modellek,


        ]);
    }
}
