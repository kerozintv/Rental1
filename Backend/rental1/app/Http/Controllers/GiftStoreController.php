<?php

namespace App\Http\Controllers;

use App\Models\CarRentals;
use App\Models\User;
use App\Models\Codes;
use App\Models\GiftStore;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;


class GiftStoreController extends Controller
{

    function addStarbucksCode(Request $request)
    {

        $starbucks_code = Codes::create([
            'code_type' => 'starbucks',
            'code' => $request->sb_code,
        ]);

        GiftStore::where('id', 1)->first()->increment('item_remaining');
    }

    function addWizzairCode(Request $request)
    {

        $wizzair_code = Codes::create([
            'code_type' => 'wizzair',
            'code' => $request->wa_code,
        ]);

        GiftStore::where('id', 2)->first()->increment('item_remaining');
    }

    function addBurgerkingCode(Request $request)
    {

        $burgerking_code = Codes::create([
            'code_type' => 'burgerking',
            'code' => $request->bk_code,
        ]);

        GiftStore::where('id', 3)->first()->increment('item_remaining');
    }


    public function getItemDetails()
    {

        $items = GiftStore::all();
        return response()->json([
            'items' => $items,
        ]);
    }


    public function CheckPoints($user_id)
    {

        $url_userid = $user_id;



        $user = User::where('id', $url_userid)->first();

        return response()->json([





            'husegpontok' => $user->husegpontok,



        ]);
    }



    public function RedeemPoints(Request $request)
    {

        $user_id = $request->user_id;
        $item_id = $request->item_id;
        $user = User::where('id', $user_id)->first();
        $item = GiftStore::where('id', $item_id)->first();
        $user_points = $user->husegpontok;
        $item_price = $item->item_price;

        $item_type = '';

        if ($item_id === 1) {
            $item_type = 'starbucks';
        } else if ($item_id === 2) {
            $item_type = 'wizzair';
        } else if ($item_id === 3) {
            $item_type = 'burgerking';
        }

        $codes = Codes::where('code_type', $item_type)->first();




        if ($user_points >= $item_price) {

            $user->decrement('husegpontok', $item_price);
            $item->decrement('item_remaining', 1);
            $codes->delete();


            return response()->json([
                'status' => 200,
                'message' => $codes->code,
            ]);
        } else {

            return response()->json([
                'status' => 400,
                'message' => 'Nincs elég pontja ennek a tételnek a beváltásához.',
            ]);
        }
    }
}
