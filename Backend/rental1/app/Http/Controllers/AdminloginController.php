<?php

namespace App\Http\Controllers;

use App\Models\Admins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminloginController extends Controller
{
    public function login(Request $request)

    {
        $validator = Validator::make($request->all(), [

            "work_id" => 'required|min:6|max:6',
            "password" => 'required',

        ]);


        if ($validator->fails()) {

            return response()->json([

                'validation_errors' => $validator->messages(),

            ]);
        } else {

            $admin = Admins::where('work_id', $request->work_id)->first();

            if (!$admin || !Hash::check($request->password, $admin->work_password)) {
                return response()->json([

                    "status" => 401,
                    "message" => 'Hibás megadaott adatok!',
                ]);
            } else {

                $token = $admin->createToken($admin->work_id . '_Token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'admin_v_nev' => $admin->vezetek_nev,
                    'admin_k_nev' => $admin->kereszt_nev,
                    'token' => $token,
                    'message' => 'Sikeres bejelentkezés!',
                ]);
            }
        }
    }


    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Ön kijelentkezett!'
        ]);
    }
}
