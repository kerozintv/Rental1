<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'v_nev' => 'required|max:191',
            'k_nev' => 'required|max:191',
            'phone' => 'required|min:9|max:9|unique:users,phone',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|max:12|min:8',
            'cpassword' => 'required|same:password',

        ]);

        if ($validator->fails()) {
            return response()->json([

                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::create([
                'v_nev' => $request->v_nev,
                'k_nev' => $request->k_nev,
                'phone' => $request->phone,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'notifications' => 0,
                'husegpontok' => 0,

            ]);

            $token = $user->createToken($user->email . '_Token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $user->email,
                'token' => $token,
                'message' => 'Sikeres regisztráció!',
            ]);
        }
    }



    public function login(Request $request)

    {
        $validator = Validator::make($request->all(), [

            "email_phone" => 'required|max:191',
            "password" => 'required',

        ]);


        if ($validator->fails()) {

            return response()->json([

                'validation_errors' => $validator->messages(),

            ]);
        } else {

            $user = User::where('email', $request->email_phone)->orWhere('phone', $request->email_phone)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([

                    "status" => 401,
                    "message" => 'Hibás megadaott adatok!',
                ]);
            } else {

                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'v_nev' => $user->v_nev,
                    'k_nev' => $user->k_nev,
                    'username' => $user->email,
                    'user_id' => $user->id,
                    'phone' => $user->phone,
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
